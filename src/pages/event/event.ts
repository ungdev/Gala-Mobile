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
  public schedulesCU: any
  public schedulesUC: any
  public fevents: any;
  public path: string;
  public timeoutMS: number;

  constructor(public navCtrl: NavController, public http: Http, private localNotifications : LocalNotifications, private storage : Storage) {
    this.path = 'http://192.168.1.80:8080';
    this.timeoutMS = 10000;
    this.fevents = {}
    this.contactServeur();
    this.events = "music"
    this.showMusic()
    this.schedulesCU=[
    {id:0,time:"21h00", remaining:"15", notification:true},
    {id:1,time:"21h30", remaining:"45", notification:false},
    {id:2,time:"22h00", remaining:"1 h 15", notification:false},
    {id:3,time:"22h30", remaining:"1 h 45", notification:false},
    {id:4,time:"23h00", remaining:"2 h 15", notification:false},
    {id:5,time:"23h30", remaining:"2 h 45", notification:false},
    {id:5,time:"00h00", remaining:"3 h 15", notification:false},
    {id:7,time:"00h30", remaining:"3 h 45", notification:false}]
    this.schedulesUC=[
    {time:"01h00", remaining:"15 mn", notification:true},
    {time:"01h30", remaining:"45 mn", notification:false},
    {time:"02h00", remaining:"1 h 15 mn", notification:false},
    {time:"02h30", remaining:"1 h 45 mn", notification:false},
    {time:"03h00", remaining:"2 h 15 mn", notification:true},
    {time:"03h30", remaining:"2 h 45 mn", notification:false},
    {time:"04h00", remaining:"3 h 15 mn", notification:false},
    {time:"04h30", remaining:"3 h 45 mn", notification:false},
    {time:"05h00", remaining:"3 h 45 mn", notification:false},
    {time:"05h30", remaining:"3 h 45 mn", notification:false}]
  }

  setupBus(){
    for (var i = 0; i < 8; i++) {
      //this.schedulesCU[i].time = (21 + Math.round(i*0.5)) + "h" + ("0" + (i%2)*30).slice(-2)
      this.schedulesCU[i].remaining = "3h 15"
      this.schedulesCU[i].notification = this.localNotifications.isPresent(1000+i)
    }
  }
  notify(i){
    this.localNotifications.schedule({
        id:1000+i,
        text: 'Notification délayé de 10s',
        at: new Date(new Date().getTime() + 10000)
      });
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
            this.fevents = data
            console.log('data from server :')
            console.log(data);

            this.storage.clear()
            this.storage.set('events', data)

        },
        err => {
            this.storage.get('events').then((val)=>{
              this.fevents = val;
              console.log(val)
            });
            this.fevents = {}
            console.log('data from memory :')
            console.log(this.fevents)
            console.log('error HTTP');
        });

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
    this.navCtrl.push(EventDetailsPage, {arg:args})

        

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
    this.setupBus()
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
