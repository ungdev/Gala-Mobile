import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import L from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';
import rooms from './RoomData.js';

@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html'
})
export class PlanPage {
	@ViewChild('map') mapContainer: ElementRef;
  	public map: any;
  	public lat: number;
  	public long: number;
  	public alt: number;
  	public x:number;
  	public y:number;
    public marker: L.Marker;
    public roomData: any

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.roomData = {"name":"", "description":""};
  }

  swipeEvent(event){
    if(event.direction == 4){
      this.navCtrl.parent.select(2);
    }
  }

  calcCoordinates(){
    //console.log("getting coords")
    this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude
            this.long = resp.coords.longitude
            this.alt = resp.coords.altitude
            console.log("lat : " + this.lat + " long : " + this.long + " alt : " + this.alt)
      }).catch((error) => {
            console.log('Error getting location', error);
      });
  	this.x = -488116.608 * (-0.6039772381)*(this.lat - 48.267489);
  	this.y = 177399.3259*(this.long - 4.063907);
    //console.log("(x, y) = " + this.x + ", " + this.y)
    if(this.x < 0) this.x = 0;
    if(this.y < 0) this.y = 0;
    if(this.x > 1000) this.x = 1000;
    if(this.y > 1000) this.y = 1000;
    
    this.marker.setLatLng(L.latLng(this.x, this.y));
    
  }

  tick() {
        setTimeout(() => {
            this.calcCoordinates()
        	  this.tick();
        }, 1000);
    }

  ionViewDidLoad() {
    this.initCoordinates()
    this.loadmap()
    this.calcCoordinates()
    this.tick()
  }
 

  initCoordinates(){
    this.lat = 0;
    this.long = 0;
    this.alt = 0;
    this.x = 0;
    this.y = 0;
   }


  loadmap() {
    var corner1 = L.latLng(0, 0),
    corner2 = L.latLng(1000, 1000),
    bounds = L.latLngBounds(corner1, corner2);
    this.map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -0.9,
    zoomControl: false,
    zoomSnap: 0,
    scrollWheelZoom : false,
    touchZoom: false,
    doubleClickZoom: false,
    dragging: true,
    maxBounds: bounds
});
	L.imageOverlay('assets/imgs/map.png', bounds).addTo(this.map);
	this.map.fitBounds(bounds);
	//L.marker([0, 0]).addTo(this.map);
  this.map.setView(new L.LatLng(470, 500));

  this.marker = L.marker([this.x, this.y]);
  this.marker.addTo(this.map);
 
  //L.marker([50, 500]).addTo(this.map);
  //console.log(rooms)
  L.geoJSON(rooms, {
    style: this.style,
    onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
}).addTo(this.map);
  //layer.addData(rooms)

  }

  onEachFeature(feature, layer) {
    layer.on(
        'click', (e) => {
          this.roomData = e.target.feature.properties;
          console.log(e.latlng.lng + ", " + e.latlng.lat)
        }
    );
  }
 
  style(feature) {
    return {
        fillColor: '#FFEDA0',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.1
    };
  }
}










