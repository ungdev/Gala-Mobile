import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GMapPage } from '../gmap/gmap';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  constructor(public navCtrl: NavController) {

  }

  click(){
  	this.navCtrl.push(GMapPage)
  }

  swipeEvent(event){
    if(event.direction == 2){
      this.navCtrl.parent.select(2);
    }
    if(event.direction == 4){
      this.navCtrl.parent.select(0);
    }
  }
}
