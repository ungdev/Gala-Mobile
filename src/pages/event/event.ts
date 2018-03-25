import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { EventDetailsPage } from './event_details';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  public spectacle: string
  public events: any
  public musicVisible: boolean
  public foodVisible: boolean
  public busVisible: boolean
  public fevents: any;
  public path: string;
  public timeoutMS: number;

  constructor(public navCtrl: NavController, public http: Http, private localNotifications : LocalNotifications, private storage : Storage) {
    this.path = 'https://api.gala.uttnetgroup.fr';
    this.timeoutMS = 10000;
    this.fevents = {}
    this.storage.get('events').then((val)=>{
        this.fevents = val;
        console.log(val)
    });
    this.contactServeur();
    this.events = "music"
    this.showMusic()
    console.log(new Date().getTime())
  }

  notify(i){
    this.localNotifications.schedule({
        id:1000+i,
        text: 'Notification délayé de 10s',
        at: new Date(new Date().getTime() + 10000)
      });
  }

  swipeEvent(event){
    if(event.direction == 2){
      this.navCtrl.parent.select(3);
    }
    if(event.direction == 4){
      this.navCtrl.parent.select(1);
    }
  }

  doRefresh(refresher){
    console.log('begin refresh')
    
    this.contactServeur()
    refresher.complete();
    console.log('end refresh')
  }

  contactServeur(){
    let encodedPath = encodeURI(this.path);
    this.http.get(encodedPath)
        .timeout(this.timeoutMS)
        .map(res => res.json()).subscribe(data => {
            console.log('data from server :')
            console.log(data);
            if(!data.hasOwnProperty('error')){
              console.log("Connected")
              this.fevents = data
              this.storage.clear()
              this.storage.set('events', data)
            }
            else{
              console.log("Not connected")
              this.getDataFromMemory()
            }
        },
        err => {
            this.getDataFromMemory()
        });

  }

  getDataFromMemory(){
    this.storage.get('events').then((val)=>{
      this.fevents = val;
      console.log(val)
    });
    this.fevents = {}
    console.log('data from memory :')
    console.log(this.fevents)
    console.log('error HTTP');
  }

  /*ionViewDidLoad() {
  	  this.localNotifications.schedule({
  	 		id: 3,
  	    title: 'Test notification immédiate',
  	    text: 'Salut cest média'
	    });


      this.localNotifications.schedule({
        text: 'Notification délayé de 10s',
        at: new Date(new Date().getTime() + 10000)
      });
  }*/

  goToDetails(args:any){
    this.navCtrl.push(EventDetailsPage, {arg:args});
  }

  isEmpty(obj){
    if(typeof obj === 'object' && obj !== null){
      if(Object.keys(obj).length === 0)
        return true;
    }
    return false;;
  }

  showMusic(){
    this.musicVisible = true
    this.foodVisible = false
    this.busVisible = false
  }
  showFood(){
    this.musicVisible = false
    this.foodVisible = true
    this.busVisible = false
  }
  showBus(){
    this.musicVisible = false
    this.foodVisible = false
    this.busVisible = true
  }
  ionSelect(){
    if(this.events == "music"){
      this.showMusic()
    }
    else if(this.events == "food"){
      this.showFood()
    }

    else{
      this.showBus()
    }
  }
}
