import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { EventDetailsPage } from './event_details';
 


@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  public spectacle: string

  constructor(public navCtrl: NavController, private localNotifications : LocalNotifications) {

  }


  ionViewDidLoad() {
  	  this.localNotifications.schedule({
  	 		id: 3,
  	    title: 'Test notification immédiate',
  	    text: 'Salut cest média'
	    });


      this.localNotifications.schedule({
        text: 'Notification délayé de 10s',
        at: new Date(new Date().getTime() + 10000)
      });
  }

  launchSpectacle(){
    this.navCtrl.push(EventDetailsPage, {'title':"Spectacle"})
  }

  launchFireworks(){
    this.navCtrl.push(EventDetailsPage, {'title':"Feu d'artifice"})
  }

  launchDaft(){
    this.navCtrl.push(EventDetailsPage, {'title':"Daft Punk"})
  }
}
