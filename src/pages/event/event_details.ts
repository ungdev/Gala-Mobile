import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 


@Component({
  selector: 'page-event-details',
  templateUrl: 'event_details.html'
})
export class EventDetailsPage{
  public title:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  ionViewDidLoad() {
  	 this.title = this.navParams.get('title');
  }


}
