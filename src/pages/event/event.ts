import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  constructor(public navCtrl: NavController, private localNotifications : LocalNotifications) {

  }


  ionViewDidLoad() {
  	  this.localNotifications.schedule({
  	 		id: 3,
  	    title: 'Mon titre de notif',
  	    text: 'Salut cest média'
	    });


      this.localNotifications.schedule({
        text: 'Delayed ILocalNotification',
        at: new Date(new Date().getTime() + 10000)
      });
  }
}
