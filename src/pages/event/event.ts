import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { EventDetailsPage } from './event_details'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/timeout'
import { Storage } from '@ionic/storage'
import moment from 'moment'

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
  public spectacle: string
  public fevents: any
  public path: string
  public timeoutMS: number
  public isRefreshing

  constructor(
    public navCtrl: NavController,
    public http: Http,
    private storage: Storage
  ) {
    this.path = 'https://api.gala.uttnetgroup.fr/api/v1/'
    this.timeoutMS = 10000
    this.fevents = []
    this.storage.get('events').then(val => {
      this.fevents = val
    })
    this.contactServeur()
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
            this.fevents = data.map(event => {
              return {
                ...event,
                start: moment(event.start).format('HH[h]'),
                end: moment(event.end).format('HH[h]')
              }
            })
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

  goToDetails(args: any) {
    this.navCtrl.push(EventDetailsPage, { arg: args })
  }

  isEmpty(obj) {
    if (typeof obj === 'object' && obj !== null) {
      if (Object.keys(obj).length === 0) return true
    }
    return false
  }
}
