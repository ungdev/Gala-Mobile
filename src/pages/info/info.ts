import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { Http } from '@angular/http'
import { GMapPage } from '../gmap/gmap'
import { Storage } from '@ionic/storage'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { Platform } from 'ionic-angular'

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  public isIOS: boolean
  public selection: any
  public infosVisible: boolean
  public busVisible: boolean
  public partenaireVisible: boolean
  public artistVisible: boolean
  public spotifyVisible: boolean
  public spotifyWidth: number
  public spotifyHeight: number
  public width: number
  public height: number
  public partners: any
  public artists: any
  private path: string
  private timeoutMS: number
  public isRefreshing

  constructor(
    private iab: InAppBrowser,
    public navCtrl: NavController,
    public http: Http,
    private storage: Storage,
    public plt: Platform
  ) {
    this.isIOS = plt.is('ios')

    this.selection = 'info'
    this.infosVisible = true
    this.busVisible = false
    this.partenaireVisible = false
    this.artistVisible = false
    this.spotifyVisible = false
    this.width = plt.width() - 35
    this.height = plt.height() - 200
    this.spotifyWidth = this.width
    this.spotifyHeight = this.height
    this.path = 'https://api.gala.uttnetgroup.fr/api/v1/'
    this.timeoutMS = 10000
    this.partners = []
    this.artists = []
    this.storage.get('partners').then(val => {
      this.partners = val
    })
    this.storage.get('artists').then(val => {
      this.artists = val
    })
    this.contactServeur()
    this.isRefreshing = false
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
    let encodedPath = encodeURI(this.path + 'partners')
    this.http
      .get(encodedPath)
      .timeout(this.timeoutMS)
      .map(res => res.json())
      .subscribe(
        data => {
          if (!data.hasOwnProperty('error')) {
            this.partners = data
            this.partners = this.partners.map(p => {
              return {
                ...p,
                image: this.path + p.image.substr(1, p.image.length - 1)
              }
            })
            this.storage.remove('partners')
            this.storage.set('partners', this.partners)
          } else {
            this.getDataFromMemory()
          }
        },
        err => {
          this.getDataFromMemory()
        }
      )
    encodedPath = encodeURI(this.path + 'artists')
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
            }).sort((a, b) => {
              if(a.index > b.index) return 1
              if(a.index < b.index) return -1
              return 0
            })
            this.storage.remove('artists')
            this.storage.set('artists', this.artists)
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
    this.storage.get('partners').then(val => {
      this.partners = val
    })
    this.storage.get('artists').then(val => {
      this.artists = val
    })
    this.partners = []
    this.artists = []
  }

  click() {
    this.navCtrl.push(GMapPage)
  }

  isEmpty(obj) {
    if (typeof obj === 'object' && obj !== null) {
      if (Object.keys(obj).length === 0) return true
    }
    return false
  }

  swipeEvent(event) {
    if (event.direction == 2) {
      this.navCtrl.parent.select(2)
    }
    if (event.direction == 4) {
      this.navCtrl.parent.select(0)
    }
  }

  showInfos() {
    this.infosVisible = true
    this.busVisible = false
    this.partenaireVisible = false
    this.artistVisible = false
    this.spotifyVisible = false
  }
  showPartenaire() {
    this.infosVisible = false
    this.busVisible = false
    this.partenaireVisible = true
    this.artistVisible = false
    this.spotifyVisible = false
  }
  showArtist() {
    this.infosVisible = false
    this.busVisible = false
    this.partenaireVisible = false
    this.artistVisible = true
    this.spotifyVisible = false
  }
  showSpotify() {
    this.infosVisible = false
    this.busVisible = false
    this.partenaireVisible = false
    this.artistVisible = false
    this.spotifyVisible = true
  }
  showBus() {
    this.infosVisible = false
    this.busVisible = true
    this.partenaireVisible = false
    this.artistVisible = false
    this.spotifyVisible = false
  }
  ionSelect() {
    if (this.selection == 'info') {
      this.showInfos()
    } else if (this.selection == 'bus') {
      this.showBus()
    } else if (this.selection == 'artists') {
      this.showArtist()
    } else if (this.selection == 'spotify') {
      this.showSpotify()
    } else {
      this.showPartenaire()
    }
  }
  mailTo(email) {
    window.open(`mailto:${email}`, '_system')
  }
  goTo(link) {
    this.iab.create(link, '_system', {})
  }

  goToPartner(partner) {
    this.iab.create(partner.url, '_system', {})
  }

  goToArtist(artist) {
    this.iab.create(artist.link, '_system', {})
  }
}
