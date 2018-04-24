import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GMapPage } from '../gmap/gmap';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  public isIOS: boolean;
  public selection: any;
  public infosVisible: boolean;
  public artistVisible: boolean;
  public width: number;
  public height: number;


  constructor(public navCtrl: NavController, public plt: Platform) {
    this.isIOS = plt.is('ios')

    this.selection = "info"
    this.infosVisible = true;
    this.artistVisible = false;
    this.width = plt.width() - 35
    this.height = plt.height() - 200
    console.log(this.width + " " + this.height)
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

  showInfos(){
    this.infosVisible = true
    this.artistVisible = false
  }
  showArtist(){
    this.infosVisible = false
    this.artistVisible = true
  }
  ionSelect(){
    if(this.selection == "info"){
      this.showInfos()
    }
    else{
      this.showArtist()
    }
  }
}
