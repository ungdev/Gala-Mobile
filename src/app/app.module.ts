import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { InfoPage } from '../pages/info/info';
import { PlanPage } from '../pages/plan/plan';
import { HomePage } from '../pages/home/home';
import { EventPage } from '../pages/event/event';
import { TabsPage } from '../pages/tabs/tabs';
import { EventDetailsPage } from '../pages/event/event_details';
import { GMapPage } from '../pages/gmap/gmap';

import { CountDownComponent } from '../pages/final_countdown/countdown';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { Geolocation } from '@ionic-native/geolocation';
//import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    InfoPage,
    PlanPage,
    HomePage,
    EventPage,
    EventDetailsPage,
    GMapPage,
    CountDownComponent,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InfoPage,
    PlanPage,
    HomePage,
    EventPage,
    EventDetailsPage,
    GMapPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    LocalNotifications, 
    Geolocation,
    //GoogleMaps,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
