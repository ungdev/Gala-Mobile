import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
 
  constructor(private iab: InAppBrowser, private navCtrl: NavController, private localNotifications : LocalNotifications) { 
    
  }

  ionViewDidLoad(){
    this.notify(501, new Date(1527962400000), "Le Gala de l'UTT c'est dans une heure !")
    this.notify(502, new Date(1527879600000), "Le Gala de l'UTT c'est demain !")
    this.notify(503, new Date(1527523200000), "Le Gala de l'UTT c'est dans 5 jours !")
    this.notify(504, new Date(1527976200000), "Une surprise vous attend dehors dans 10 minutes...")
    this.notify(505, new Date(1527978000000), "Dans 10 minutes retrouvez Uppermost sur la scène électro")
    this.notify(506, new Date(1527981600000), "Dans 10 minutes retrouvez Kavinsky sur la scène électro")
    this.notify(507, new Date(1527966000000), "Le Gala ouvre ses portes... Vous n'êtes pas prêts...")
    this.notify(508, new Date(1527967800000), "Le spectacle commencera dans 30 minutes en M500")
    this.notify(509, new Date(1527991200000), "Le Gala fermera ses portes dans une heure... Merci d'être venus !")
    this.notify(510, new Date(1527993000000), "Le Gala fermera ses portes dans 30 minutes... On espère que cela vous a plu !")
    this.notify(511, new Date(1527989400000), "Les Foods Truck fermeront dans 1h")
    this.notify(512, new Date(1527984000000), "Arrêt de la vente d'alcool dans 1h")
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


  notify(id, date, message){
    if(this.localNotifications.isPresent(id)){
      this.localNotifications.cancel(id)
    }
    this.localNotifications.schedule({
        id:id,
        text: message,
        at: new Date(date)
      }); // convention sur id : event entre 1000 et 1999
  }
}