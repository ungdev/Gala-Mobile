import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
 
  constructor(private navController: NavController) { 
  }

  ionViewDidLoad(){
  		this.date = 'coucou'
  }
 
  ngOnInit() {
      this.countdown.initCountDown();
  }
 
}