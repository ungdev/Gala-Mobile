import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { AlertController } from 'ionic-angular'
import { TicketDetailsPage } from './ticket_details'
import { Storage } from '@ionic/storage'
import { Http } from '@angular/http'

@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html'
})
export class TicketPage {
  public tickets: any

  constructor(
    private iab: InAppBrowser,
    public http: Http,
    private storage: Storage,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {
    this.tickets = []
    this.getDataFromMemory()
  }

  swipeEvent(event) {
    if (event.direction == 2) {
      this.navCtrl.parent.select(3)
    }
    if (event.direction == 4) {
      this.navCtrl.parent.select(1)
    }
  }

  isEmpty(obj) {
    if (typeof obj === 'object' && obj !== null) {
      if (Object.keys(obj).length === 0) return true
    }
    return false
  }

  goToBilleterie() {
    this.iab.create('http://billetterie.gala.utt.fr', '_system', {})
  }

  goToDetails(ticket: any) {
    this.navCtrl.push(TicketDetailsPage, { ticket: ticket, this: this })
  }

  addClicked() {
    this.showPrompt()
  }

  getDataFromMemory() {
    this.storage.get('tickets').then(val => {
      this.tickets = val
      if (this.tickets === null) this.tickets = []

      this.checkTicket()
    })
    this.tickets = []
  }

  checkTicket() {
    for (let ticket in this.tickets) {
      let encodedPath = encodeURI(
        'https://api.gala.uttnetgroup.fr/ticket/code=' +
          this.tickets[ticket].qrcode +
          '&name=' +
          this.tickets[ticket].name
      )
      this.http
        .get(encodedPath)
        .timeout(10000)
        .map(res => res.json())
        .subscribe(
          data => {
            console.log(data.statusCode)
            if (data.statusCode === 404) {
              this.presentAlert(data.statusCode)
              this.tickets.splice(ticket, 1)
              this.storage.remove('tickets')
              this.storage.set('tickets', this.tickets)
            }
          },
          err => {
            this.presentAlert(524)
            this.getDataFromMemory()
          }
        )
    }
  }

  presentAlert(code) {
    let alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: "Echec de la récupération du billet, code d'erreur " + code,
      buttons: ['ok']
    })
    alert.present()
  }

  contactBilletterie(code, name) {
    let encodedPath = encodeURI(
      'https://api.gala.uttnetgroup.fr/ticket/code=' + code + '&name=' + name
    )
    this.http
      .get(encodedPath)
      .timeout(10000)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data.statusCode)
          if (data.statusCode === 200) {
            this.tickets.push(data.body.data)
            this.storage.remove('tickets')
            this.storage.set('tickets', this.tickets)
          } else {
            this.presentAlert(data.statusCode)
            this.getDataFromMemory()
          }
        },
        err => {
          this.presentAlert(524)
          this.getDataFromMemory()
        }
      )
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Ajouter un billet',
      message:
        "Rentrez le numéro du billet qui se trouve sur votre place, ainsi que le nom associé pour le télécharger dans l'application",
      inputs: [
        {
          name: 'name',
          placeholder: 'Entrez votre nom'
        },
        {
          name: 'code',
          placeholder: 'Entrez le numéro du billet'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked')
          }
        },
        {
          text: 'Ajouter',
          handler: data => {
            for (let ticket in this.tickets) {
              if (this.tickets[ticket].qrcode === data.code) {
                this.presentAlert(409 + ', vous avez déjà ce billet.')
                return
              }
            }
            this.contactBilletterie(data.code, data.name)
          }
        }
      ]
    })
    prompt.present()
  }
}
