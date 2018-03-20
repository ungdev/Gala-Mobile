import { Component } from '@angular/core';

import L from 'leaflet';
 


@Component({
  selector: 'page-gmap',
  templateUrl: 'gmap.html'
})
export class GMapPage{

  //public map: GoogleMap;
  constructor() { }

  ionViewDidLoad() {
   this.loadMap();
  }

 loadMap() {

   var mymap = L.map('gmap').setView([48.268918, 4.066926], 17);
   L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaGVja3MiLCJhIjoiY2pkcmZ2NTVvMXJlbjMzcW9hMmk0ZWdyMiJ9.EnyIpcTpKkaNXkYgqQ5hHA'
}).addTo(mymap);
  }
}
