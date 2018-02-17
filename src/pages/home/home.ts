import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { CountDownComponent } from '../final_countdown/countdown';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild(CountDownComponent) countdown: CountDownComponent;
 
  appName = 'App Gala';
  public date;
 
  constructor() { 
  }

  ionViewDidLoad(){
  }
 
  ngOnInit() {
      this.countdown.initCountDown();
  }
 
}