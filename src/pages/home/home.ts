import { Component } from '@angular/core'
import { ViewChild } from '@angular/core'
import { NavController } from 'ionic-angular'
import { CountDownComponent } from '../final_countdown/countdown'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(CountDownComponent) countdown: CountDownComponent

  appName = 'Gala-UTT'
  public date

  constructor(
    private iab: InAppBrowser,
    private navCtrl: NavController,
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
}
