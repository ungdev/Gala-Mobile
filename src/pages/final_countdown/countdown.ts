import {Component} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

 
@Component({
    selector: 'countdown',
    templateUrl: 'countdown.html'
})

export class CountDownComponent {
 
    public gala_date: any;
    public days;
    public hours;
    public minutes;
    public seconds;
    public distance;
    public lat;
    public long;
    public alt;

    constructor(private geolocation: Geolocation) {
    }
 
    ngOnInit() {
        this.initCountDown();
    }

    calcRemainigTime(){
        var now = new Date().getTime()
        var date_gala = new Date("Jun 2, 2018 21:00:00").getTime()
        this.distance = date_gala - now

        this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
        if (this.distance > 0) {
                this.tick();
        }
        else {
                //this.timer.hasFinished = true;
        }

        this.geolocation.getCurrentPosition().then((resp) => {
         this.lat = resp.coords.latitude
         this.long = resp.coords.longitude
         this.alt = resp.coords.altitude
        }).catch((error) => {
          console.log('Error getting location', error);
        });
    }
 
    initCountDown() {
        this.calcRemainigTime()
        this.tick()
    }
 
 
 
    tick() {
        setTimeout(() => {
            this.calcRemainigTime()
        }, 1000);
    }
    
}