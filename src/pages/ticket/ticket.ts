import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
import { TicketDetailsPage } from './ticket_details'
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html'
})
export class TicketPage {

  public tickets: any;


  constructor(private iab: InAppBrowser, public http: Http, 
      private storage : Storage, public navCtrl: NavController, public alertCtrl: AlertController) {
    this.tickets = [
      {
        "name":"Dufour",
        "firstname":"Arnaud",
        "code":"jfahf",
        "options":["fastpass"],
        "link":"http://facebook.com"
      },
      {
        "name":"Heroulmapoule",
        "firstname":"Benjamin",
        "code":"fjzpf",
        "options":["cashless"],
        "link":"http://facebook.com"
      },
    ]
    this.getDataFromMemory()
    this.checkTicket()
  }

  swipeEvent(event){
    if(event.direction == 2){
      this.navCtrl.parent.select(3);
    }
    if(event.direction == 4){
      this.navCtrl.parent.select(1);
    }
  }

  isEmpty(obj){
    if(typeof obj === 'object' && obj !== null){
      if(Object.keys(obj).length === 0)
        return true;
    }
    return false;;
  }

  goToBilleterie(){
    this.iab.create('http://billetterie.gala.utt.fr', '_system', {});
  }

  goToDetails(ticket:any){
    this.navCtrl.push(TicketDetailsPage, {ticket:ticket});
  }

  addClicked(){
    this.showPrompt()
  }

  getDataFromMemory(){
    this.storage.get('tickets').then((val)=>{
      this.tickets = val;
    });
    this.tickets = {}
  }

  checkTicket(){
    for(let i = 0; i < this.tickets)
  }

  contactBilletterie(code, name){
    let encodedPath = encodeURI('https://api.gala.uttnetgroup.fr/ticket/code=' + code + '&name=' + name);
    this.http.get(encodedPath)
        .timeout(10000)
        .map(res => res.json()).subscribe(data => {
            if(!data.hasOwnProperty('error')){
              this.tickets = data
              this.storage.remove('tickets')
              this.storage.set('tickets', data)
            }
            else{
              this.getDataFromMemory()
            }
        },
        err => {
            this.getDataFromMemory()
        });
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Ajouter un billet',
      message: "Rentrez le numéro du billet qui se trouve sur votre place, ainsi que le nom associé pour le télécharger dans l'application",
      inputs: [
        {
          name: 'name',
          placeholder: 'Entrez votre nom'
        },
        {
          name: 'code',
          placeholder: 'Entrez le numéro du billet'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ajouter',
          handler: data => {
            this.contactBilletterie(data.code, data.name)
          }
        }
      ]
    });
    prompt.present();
  }
}
