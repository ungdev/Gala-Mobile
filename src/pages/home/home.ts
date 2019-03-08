import { Component } from '@angular/core'
import { ViewChild } from '@angular/core'
import { NavController } from 'ionic-angular'
//import { LocalNotifications } from '@ionic-native/local-notifications'
import { CountDownComponent } from '../final_countdown/countdown'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(CountDownComponent) countdown: CountDownComponent

  appName = 'Gala UTT'
  public date

  constructor(
    private iab: InAppBrowser,
    private navCtrl: NavController,
    //private localNotifications: LocalNotifications,
    private storage: Storage
  ) {}


  ngOnInit() {
    this.countdown.initCountDown()
  }

  swipeEvent(event) {
    if (event.direction == 2) {
      this.navCtrl.parent.select(1)
    }
  }

  goToBilleterie() {
    this.iab.create('http://billetterie.gala.utt.fr', '_system', {})
  }

  notify(id, date, message) {
    /*if (this.localNotifications.isPresent(id)) {
      this.localNotifications.cancel(id)
    }
    this.localNotifications.schedule({
      id: id,
      text: message,
      trigger: { at: new Date(date) },
      led: 'FF0000',
      sound: null
    }) // convention sur id : event entre 1000 et 1999*/
  }
}
