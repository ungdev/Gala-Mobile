import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { EventDetailsPage } from './event_details'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/timeout'
import { Storage } from '@ionic/storage'
//import { Calendar } from '@ionic-native/calendar';
import { AlertController } from 'ionic-angular'

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
  public spectacle: string
  public events: any
  public musicVisible: boolean
  public foodVisible: boolean
  public busVisible: boolean
  public fevents: any
  public path: string
  public timeoutMS: number
  public isRefreshing

  constructor(
    public navCtrl: NavController,
    public http: Http,
    private storage: Storage,
    /*private calendar : Calendar, */ private alertCtrl: AlertController
  ) {
    this.path = 'https://api.gala.uttnetgroup.fr/api/v1/'
    this.timeoutMS = 10000
    this.fevents = []
    this.storage.get('events').then(val => {
      this.fevents = val
    })
    this.contactServeur()
    this.events = 'music'
    this.showMusic()
    this.isRefreshing = false
  }

  swipeEvent(event) {
    if (event.direction == 4) {
      this.navCtrl.parent.select(2)
    }
  }

  doRefresh(refresher) {
    if (this.isRefreshing) {
      return
    }

    this.isRefreshing = true

    this.contactServeur()
    refresher.complete()
    this.isRefreshing = false
  }

  contactServeur() {
    let encodedPath = encodeURI(this.path + 'events')
    this.http
      .get(encodedPath)
      .timeout(this.timeoutMS)
      .map(res => res.json())
      .subscribe(
        data => {
          if (!data.hasOwnProperty('error')) {
            this.fevents = data
            this.storage.remove('events')
            this.storage.set('events', data)
          } else {
            this.getDataFromMemory()
          }
        },
        err => {
          this.getDataFromMemory()
        }
      )
  }

  getDataFromMemory() {
    this.storage.get('events').then(val => {
      this.fevents = val
    })
    this.fevents = []
  }

  calendarClicked() {
    /*if(!this.calendar.hasReadWritePermission()){
      this.calendar.requestReadWritePermission().then(
        (msg) => { console.log(msg); },
        (err) => { console.log(err); });
    }
    else{
      this.confirmCalendar()
    }*/
  }

  confirmCalendar() {
    let alert = this.alertCtrl.create({
      title: 'Calendrier',
      message:
        'Voulez-vous ajouter les événements du Gala à votre calendrier ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked')
          }
        },
        {
          text: 'Ok !',
          handler: () => {
            var dateStart = new Date('Jun 2, 2018 20:00:00')
            var dateEnd = new Date('Jun 3, 2018 01:00:00')
            /*this.calendar.createEvent("Ouverture du Gala UTT", "12 rue Marie Curie 10000 Troyes", 
                "N'oubliez pas votre costume !", dateStart, dateEnd)*/
            //this.calendar.hasReadWritePermission()
            //this.calendar.openCalendar(new Date("Jun 2, 2018 20:00:00"))
          }
        }
      ]
    })
    alert.present()
  }

  goToDetails(args: any) {
    this.navCtrl.push(EventDetailsPage, { arg: args })
  }

  isEmpty(obj) {
    if (typeof obj === 'object' && obj !== null) {
      if (Object.keys(obj).length === 0) return true
    }
    return false
  }

  showMusic() {
    this.musicVisible = true
    this.foodVisible = false
    this.busVisible = false
  }
  showFood() {
    this.musicVisible = false
    this.foodVisible = true
    this.busVisible = false
  }
  showBus() {
    this.musicVisible = false
    this.foodVisible = false
    this.busVisible = true
  }
  ionSelect() {
    if (this.events == 'music') {
      this.showMusic()
    } else if (this.events == 'food') {
      this.showFood()
    } else {
      this.showBus()
    }
  }
}
