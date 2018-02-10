import {Component} from '@angular/core';
 
 
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
    constructor() {
    }
 
    ngOnInit() {
        this.initCountDown();
    }

    calcRemainigTime(){
        var now = new Date().getTime()
        var date_gala = new Date("Jun 2, 2018 20:00:00").getTime()
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