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
    this.getDataFromMemory()
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
            this.fevents = data
              .map(event => {
                return {
                  ...event,
                  start: event.start,
                  end: event.end,
                  image:
                    this.path + event.image.substr(1, event.image.length - 1),
                  place: event.place,
                  title: event.name,
                  description: event.description
                }
              })
              .sort((a, b) => {
                if (moment(a.start).isBefore(b.start)) return -1
                if (moment(a.start).isAfter(b.start)) return 1
                return 0
              })
            this.storage.remove('events')
            this.storage.set('events', this.fevents)
          } else {
            this.getDataFromMemory()
          }
        },
        err => {
          this.getDataFromMemory()
        }
      )
  }

  getStart(event) {
    if(moment().isAfter(event.start)) return 'En ce moment'
    return moment(event.start).format('HH[h]mm')
  }

  isOver(event) {
    return moment().isAfter(event.end)
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
