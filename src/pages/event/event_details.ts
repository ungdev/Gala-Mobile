import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 


@Component({
  selector: 'page-event-details',
  templateUrl: 'event_details.html'
})
export class EventDetailsPage{
  public id: number
  public args: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.args = {Title:"null"}
  }


  ionViewDidLoad() {
  	this.args = this.navParams.get('arg');
  }


}
