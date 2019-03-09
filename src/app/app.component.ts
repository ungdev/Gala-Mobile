import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { OneSignal } from '@ionic-native/onesignal'
import { PlatformHelper } from '../helpers/PlatformHelper'

import { TabsPage } from '../pages/tabs/tabs'

@Component({
  templateUrl: 'app.html',
  providers: [PlatformHelper]
})
export class MyApp {
  rootPage: any = TabsPage

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private oneSignal: OneSignal,
    private platformHelper: PlatformHelper
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('INIT')
      this.statusBar.backgroundColorByHexString('#492964')
      this.statusBar.overlaysWebView(false)
      this.splashScreen.hide()
      console.log('INIT 2')
      if(this.platformHelper.isMobile(this.platform)) {
        console.log('INIT 3')
        console.log("init onesignal", this.oneSignal)
        this.oneSignal.startInit('06b95aa2-adc5-4e43-816b-a957b05435a5', '885082636664')
        console.log('?????')
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert)

        console.log('oui')
        this.oneSignal.handleNotificationReceived().subscribe(() => {
          console.log('notif received')
        // do something when notification is received
        })

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          console.log('notif opened')
        // do something when a notification is opened
        })

        this.oneSignal.endInit()
        console.log('end init')

      }
    })
  }
}
