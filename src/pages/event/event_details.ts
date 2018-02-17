import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 


@Component({
  selector: 'page-event-details',
  templateUrl: 'event_details.html'
})
export class EventDetailsPage{
  public id:number

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  ionViewDidLoad() {
  	 this.id = this.navParams.get('id');
  }


}
