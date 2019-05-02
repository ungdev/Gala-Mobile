import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { MyApp } from './app.component'

import { InfoPage } from '../pages/info/info'
import { OneSignal } from '@ionic-native/onesignal'
import { PlanPage } from '../pages/plan/plan'
import { TicketPage } from '../pages/ticket/ticket'
import { HomePage } from '../pages/home/home'
import { EventPage } from '../pages/event/event'
import { TabsPage } from '../pages/tabs/tabs'
import { EventDetailsPage } from '../pages/event/event_details'
import { TicketDetailsPage } from '../pages/ticket/ticket_details'
import { GMapPage } from '../pages/gmap/gmap'

import { CountDownComponent } from '../pages/final_countdown/countdown'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import { Geolocation } from '@ionic-native/geolocation/ngx'
//import { GoogleMaps } from '@ionic-native/google-maps';
import { NativePageTransitions } from '@ionic-native/native-page-transitions'
import { HttpModule } from '@angular/http'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { IonicStorageModule } from '@ionic/storage'
import { NgxQRCodeModule } from 'ngx-qrcode2'

@NgModule({
  declarations: [
    MyApp,
    InfoPage,
    PlanPage,
    TicketPage,
    HomePage,
    EventPage,
    EventDetailsPage,
    TicketDetailsPage,
    GMapPage,
    CountDownComponent,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InfoPage,
    PlanPage,
    TicketPage,
    HomePage,
    EventPage,
    EventDetailsPage,
    TicketDetailsPage,
    GMapPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    //LocalNotifications,
    Geolocation,
    InAppBrowser,
    //GoogleMaps,
    SplashScreen,
    OneSignal,
    NativePageTransitions,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
