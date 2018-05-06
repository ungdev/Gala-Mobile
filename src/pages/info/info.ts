import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GMapPage } from '../gmap/gmap';
import { InAppBrowser } from '@ionic-native/in-app-browser';
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
  public partenaireVisible: boolean;
  public width: number;
  public height: number;


  constructor(private iab: InAppBrowser, public navCtrl: NavController, public plt: Platform) {
    this.isIOS = plt.is('ios')

    this.selection = "info"
    this.infosVisible = true;
    this.artistVisible = false;
    this.partenaireVisible = false;
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
    this.partenaireVisible = false
  }
  showArtist(){
    this.infosVisible = false
    this.artistVisible = true
    this.partenaireVisible = false
  }
  showPartenaire(){
    this.infosVisible = false
    this.artistVisible = false
    this.partenaireVisible = true
  }
  ionSelect(){
    if(this.selection == "info"){
      this.showInfos()
    }
    else if(this.selection == "artists"){
      this.showArtist()
    }
    else{
      this.showPartenaire()
    }
  }

  allysonLink(){
    this.iab.create('http://ae-allyson.com', '_system', {});
  }
  amnestyLink(){
    this.iab.create('https://www.amnesty.fr', '_system', {});
  }
  nrjLink(){
    this.iab.create('http://www.nrj.fr', '_system', {});
  }
  socotecLink(){
    this.iab.create('http://www.socotec.fr', '_system', {});
  }
  festilightLink(){
    this.iab.create('http://www.festilight.com', '_system', {});
  }
  bdeLink(){
    this.iab.create('https://www.facebook.com/bde.utt/', '_system', {});
  }
  k2aLink(){
    this.iab.create('https://www.k2a-club.com', '_system', {});
  }
  mgelLink(){
    this.iab.create('https://www.mgel.fr', '_system', {});
  }
  rgLink(){
    this.iab.create('https://www.facebook.com/rivegauchecafe/?rf=125308984192319', '_system', {});
  }
  premautoLink(){
    this.iab.create('http://www.premiumautomobiles-troyes.com', '_system', {});
  }
  socgeneraleLink(){
    this.iab.create('https://www.societegenerale.fr', '_system', {});
  }
  teklissLink(){
    this.iab.create('http://www.tekliss.com', '_system', {});
  }
  uttLink(){
    this.iab.create('http://www.utt.fr/fr/index.html', '_system', {});
  }
}
