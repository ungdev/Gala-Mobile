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
  public width: number
  public height: number
  public partners: any
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
    this.width = plt.width() - 35
    this.height = plt.height() - 200
    this.path = 'https://api.gala.uttnetgroup.fr/api/v1/'
    this.timeoutMS = 10000
    this.partners = []
    this.storage.get('partners').then(val => {
      this.partners = val
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
            this.storage.remove('partners')
            this.storage.set('partners', data)
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
    this.partners = []
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
  }
  showPartenaire() {
    this.infosVisible = false
    this.busVisible = false
    this.partenaireVisible = true
  }
  showBus() {
    this.infosVisible = false
    this.busVisible = true
    this.partenaireVisible = false
  }
  ionSelect() {
    if (this.selection == 'info') {
      this.showInfos()
    } else if (this.selection == 'bus') {
      this.showBus()
    } else {
      this.showPartenaire()
    }
  }
  mailTo(email) {
    window.open(`mailto:${email}`, '_system')
  }

  goToPartner(partner) {
    this.iab.create(partner.url, '_system', {});
  }
}
