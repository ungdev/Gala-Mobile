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
}
