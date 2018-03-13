import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
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
 
  constructor(private iab: InAppBrowser) { 
  }

  ionViewDidLoad(){

  }
 
  ngOnInit() {
      this.countdown.initCountDown();
  }
 

  goToBilleterie(){
    const browser = this.iab.create('http://billetterie.gala.utt.fr', '_system', {});
  }
}