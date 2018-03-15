import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CountDownComponent } from '../final_countdown/countdown';
import { InAppBrowser } from '@ionic-native/in-app-browser';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild(CountDownComponent) countdown: CountDownComponent;
 
  appName = 'App Gala';
  public date;
 
  constructor(private iab: InAppBrowser, private navCtrl: NavController) { 
  }

  ionViewDidLoad(){

  }
 
  ngOnInit() {
      this.countdown.initCountDown();
  }
 
  swipeEvent(event){
    if(event.direction == 2){
      this.navCtrl.parent.select(1);
    }
  }

  goToBilleterie(){
    this.iab.create('http://billetterie.gala.utt.fr', '_system', {});
  }
}