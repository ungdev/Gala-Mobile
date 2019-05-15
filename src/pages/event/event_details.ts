import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { Http } from '@angular/http'
import moment from 'moment'

@Component({
  selector: 'page-event-details',
  templateUrl: 'event_details.html'
})
export class EventDetailsPage {
  public id: number
  public args: any
  private artists: any
  public artist: any
  private partners: any
  public partner: any
  private path: string
  private timeoutMS: number

  constructor(
    private iab: InAppBrowser,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private storage: Storage
  ) {
    this.args = { Title: 'null' }
    this.path = 'https://api.gala.uttnetgroup.fr/api/v1/'
    this.timeoutMS = 10000
    this.getDataFromMemory()
    this.contactServeur()
  }

  getArtist() {
    if (!this.args.artistId) return
    const artist = this.artists.find(a => a.id === this.args.artistId)
    if (artist) this.artist = artist
  }

  getPartner() {
    if (!this.args.partnerId) return
    const partner = this.partners.find(p => p.id === this.args.partnerId)
    if (partner) this.partner = partner
  }

  getStart(event, change) {
    if(change && moment().isAfter(event.start)) return 'En ce moment'
    return moment(event.start).format('HH[h]mm')
  }

  getEnd(event) {
    return moment(event.end).format('HH[h]mm')
  }

  contactServeur() {
    let encodedPath = encodeURI(this.path + 'artists')
    this.http
      .get(encodedPath)
      .timeout(this.timeoutMS)
      .map(res => res.json())
      .subscribe(
        data => {
          if (!data.hasOwnProperty('error')) {
            this.artists = data
            this.artists = this.artists.map(a => {
              return {
                ...a,
                image: this.path + a.image.substr(1, a.image.length - 1)
              }
            })
            this.storage.remove('artists')
            this.storage.set('artists', this.artists)
            this.getArtist()
          } else {
            this.getDataFromMemory()
          }
        },
        err => {
          this.getDataFromMemory()
        }
      )

    encodedPath = encodeURI(this.path + 'partners')
    this.http
      .get(encodedPath)
      .timeout(this.timeoutMS)
      .map(res => res.json())
      .subscribe(
        data => {
          if (!data.hasOwnProperty('error')) {
            this.partners = data
            this.partners = this.partners.map(a => {
              return {
                ...a,
                image: this.path + a.image.substr(1, a.image.length - 1)
              }
            })
            this.storage.remove('partners')
            this.storage.set('partners', this.partners)
            this.getPartner()
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
    this.storage.get('artists').then(val => {
      this.getArtist()
      this.artists = val
    })
    this.storage.get('partners').then(val => {
      this.getPartner()
      this.partners = val
    })
    this.partners = []
    this.artists = []
  }

  ionViewDidLoad() {
    this.args = this.navParams.get('arg')
  }

  goTo(link) {
    this.iab.create(link, '_system', {})
  }
}
