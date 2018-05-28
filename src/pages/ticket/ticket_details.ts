import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket_details.html'
})
export class TicketDetailsPage {

  public ticket: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
    this.ticket = {"name":"", "firstname":"1", "code":"", "options":[]}
  }

  swipeEvent(event){
    if(event.direction == 2){
      this.navCtrl.parent.select(3);
    }
    if(event.direction == 4){
      this.navCtrl.parent.select(1);
    }
  }

  isEmpty(obj){
    if(typeof obj === 'object' && obj !== null){
      if(Object.keys(obj).length === 0)
        return true;
    }
    return false;;
  }

  ionViewDidLoad() {
    this.ticket = this.navParams.get('ticket');
  }

  hasFastPass(){
    if(this.ticket.options.indexOf("fastpass") == -1)
      return false;
    return true;
  }

  hasCashLess(){
    if(this.ticket.options.indexOf("cashless") == -1)
      return false;
    return true;
  }

  download(){
    this.iab.create(this.ticket.link, '_system', {});
  }
}
