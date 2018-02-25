import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import L from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html'
})
export class PlanPage {
	@ViewChild('map') mapContainer: ElementRef;
  	public map: any;
  	public anchor: any;
  	public vectorX: number;
  	public vectorY: number;
  	public lat: number;
  	public long: number;
  	public alt: number;
  	public x:number;
  	public y:number;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  	this.anchor = [
  	{latitude:48.295889, longitude:4.058940, x:0, y:0},
  	{latitude:48.295889, longitude:4.058940, x:0, y:0},
  	{latitude:48.295889, longitude:4.058940, x:0, y:0},
  	{latitude:48.295889, longitude:4.058940, x:0, y:0},
  	{latitude:48.295889, longitude:4.058940, x:0, y:0},
  	{latitude:48.295889, longitude:4.058940, x:0, y:0}]
  	this.vectorX = 0;
  	this.vectorY = 0;
  	var divisor = 0;
  	for (var i = 0; i < this.anchor.length; i++) {
  		this.vectorX += this.anchor[i].x / this.anchor[i].latitude;
  		this.vectorY += this.anchor[i].y / this.anchor[i].longitude;
  		divisor++;
  	}
  	this.vectorX = this.vectorX / divisor;
  	this.vectorY = this.vectorY / divisor;

  }


  calcCoordinates(){
  	this.x = this.lat*this.vectorX;
  	this.y = this.long*this.vectorY;
  	// ajouter calcule du marqueur
  }

  tick() {
        setTimeout(() => {
            this.calcCoordinates()
            this.geolocation.getCurrentPosition().then((resp) => {
	         	this.lat = resp.coords.latitude
	         	this.long = resp.coords.longitude
	         	this.alt = resp.coords.altitude
        	}).catch((error) => {
          		console.log('Error getting location', error);
        	});
        	this.tick();
        }, 1000);
    }

  ionViewDidLoad() {
    this.loadmap();
    this.tick()
  }
 
  loadmap() {
    this.map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -0.7,
    zoomControl: false,
    zoomSnap: 0,
    scrollWheelZoom : false,
    touchZoom: false,
    doubleClickZoom: false,
    dragging: false
});
	L.imageOverlay('assets/imgs/map.png', [[0,0], [542,903]]).addTo(this.map);
	this.map.fitBounds([[0,0], [542,903]]);
	L.marker([200, 450]).addTo(this.map);
  }
}
