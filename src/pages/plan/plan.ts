import { Component, ElementRef, ViewChild } from '@angular/core'
import { NavController } from 'ionic-angular'
import L from 'leaflet'
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'
import { Geolocation } from '@ionic-native/geolocation/ngx'

@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html'
})
export class PlanPage {
  @ViewChild('map') mapContainer: ElementRef
  public map: any
  public lat: number
  public long: number
  public alt: number
  f
  public x: number
  public y: number
  public marker: L.Marker
  public roomData: any
  public room: any
  public geojson: any
  public lastClicked: any

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public http: Http,
    private storage: Storage
  ) {
    this.lastClicked = 0
    this.roomData = {
      name: 'Plan Interactif',
      description:
        "Cliquez sur une zone du Gala pour avoir plus d'information sur celle-ci",
      quote: "Trouver n'est rien, c'est le plan qui est difficile.",
      author: 'Fedor Dostoïevski'
    }

    this.getDataFromMemory()
    this.contactServer()
  }

  contactServer() {
    let encodedPath = encodeURI('https://api.gala.uttnetgroup.fr/api/v1/map')
    this.http
      .get(encodedPath)
      .timeout(10000)
      .map(res => res.json())
      .subscribe(
        data => {
          if (!data.hasOwnProperty('error')) {
            this.room = data
            this.storage.remove('map')
            this.storage.set('map', this.room)
          } else {
            this.getDataFromMemory()
          }
          this.load()
        },
        err => {
          this.getDataFromMemory()
        }
      )
  }

  getDataFromMemory() {
    this.storage.get('map').then(val => {
      this.room = val
    })
    this.room = []
  }

  swipeEvent(event) {
    if (event.direction == 4) {
      this.navCtrl.parent.select(3)
    }
  }

  calcCoordinates() {
    //console.log('getting coords')
    /*this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.lat = resp.coords.latitude
        this.long = resp.coords.longitude
        this.alt = resp.coords.altitude
        console.log(
          'lat : ' + this.lat + ' long : ' + this.long + ' alt : ' + this.alt
        )
      })
      .catch(error => {
        console.log('Error getting location', error)
      })*/
    let watch = this.geolocation.watchPosition()
    watch.subscribe(data => {
      this.lat = data.coords.latitude
      this.long = data.coords.longitude
      this.alt = data.coords.altitude
      console.log(
        'lat : ' + this.lat + ' long : ' + this.long + ' alt : ' + this.alt
      )
      this.x = -488116.608 * -0.6039772381 * (this.lat - 48.267489)
      this.y = 177399.3259 * (this.long - 4.063907)
      console.log('(x, y) = ' + this.x + ', ' + this.y)
      if (this.x < 0) this.x = 0
      if (this.y < 0) this.y = 0
      if (this.x > 1000) this.x = 1000
      if (this.y > 1000) this.y = 1000

      this.marker.setLatLng(L.latLng(this.x, this.y))
    })
  }

  load() {
    this.initCoordinates()
    this.loadmap()
    this.calcCoordinates()
  }

  initCoordinates() {
    this.lat = 0
    this.long = 0
    this.alt = 0
    this.x = 0
    this.y = 0
  }

  loadmap() {
    var corner3 = L.latLng(0, 0),
      corner4 = L.latLng(1000, 1000),
      bounds2 = L.latLngBounds(corner3, corner4),
      corner1 = L.latLng(-300, -300),
      corner2 = L.latLng(1300, 1300),
      bounds = L.latLngBounds(corner1, corner2)
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -1.4,
      zoomControl: true,
      zoomSnap: 1,
      scrollWheelZoom: true,
      touchZoom: true,
      doubleClickZoom: true,
      dragging: true,
      maxBounds: bounds
    })
    L.imageOverlay('assets/imgs/map.png', bounds2).addTo(this.map)
    this.map.fitBounds(bounds2)
    this.map.setView(new L.LatLng(420, 510))

    this.marker = L.marker([this.x, this.y])
    this.marker.addTo(this.map)

    this.geojson = L.geoJSON(this.room, {
      style: this.style,
      onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
    }).addTo(this.map)
  }

  onEachFeature(feature, layer) {
    layer.on('click', e => {
      if (this.lastClicked != 0) this.geojson.resetStyle(this.lastClicked)
      this.roomData = e.target.feature.properties
      if (this.roomData.name != 'Plan Interactif') {
        e.target.setStyle({
          weight: 3,
          color: 'red',
          dashArray: '',
          fillOpacity: 0.2
        })
      }
      this.lastClicked = e.target
      console.log('[' + e.latlng.lng + ', ' + e.latlng.lat + ']')
    })
  }

  style(feature) {
    return {
      fillColor: '#FFFFFF',
      weight: 2,
      opacity: 0,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0
    }
  }
}
