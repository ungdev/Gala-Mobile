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
  	public lat: number;
  	public long: number;
  	public alt: number;
  	public x:number;
  	public y:number;
    public marker: L.Marker;
    public roomData: any;
    public room: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.roomData = {
      "name": "Plan Interactif",
      "description":"Cliquez sur une zone du Gala pour avoir plus d'information sur celle-ci",
      "quote":"Trouver n'est rien, c'est le plan qui est difficile.",
      "author":"Fedor Dostoïevski"
    };

    this.room = {"type":"FeatureCollection","features":[
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[0, 0], [1000, 0], [1000, 1000], [0, 1000], [0, 0]]]
      },
      "properties": {
        "name": "Plan Interactif",
        "description":"Cliquez sur une zone du Gala pour avoir plus d'information sur celle-ci",
        "quote":"Trouver n'est rien, c'est le plan qui est difficile.",
      "author":"Fedor Dostoïevski"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [345.22220686861874, 591.5429166343359], 
        [378.81139456394385, 610.203576465072], 
        [326.56154703788263, 651.2570280926916], 
        [300.436623274852, 623.2660383465874], 
        [345.22220686861874, 591.5429166343359]
        ]]
      },
      "properties": {
        "name": "Hall N",
        "description":"Entrée du Gala. Vous y retrouverez un point de rechargement.",
        "quote":"Demain il sera 24h trop tard.",
        "author":"Timothée Toury"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [546.7573330405692, 427.3291101238578], 
        [473.9807597006982, 481.4450236329926], 
        [501.9717494468024, 515.0342113283177], 
        [574.7483227866734, 460.918297819182], 
        [546.7573330405692, 427.3291101238578]
        ]]
      },
      "properties": {
        "name": "Poste de Secourisme de Sec'UTT",
        "description":"Si tu finis en pls, tu te réveilleras surrement là bas :) ",
        "quote":"C'est deux fois secourir un malheureux que de le secourir promptement.",
        "author":"Publius Syrus"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [578.4804547528206, 455.320099869962], 
        [625.1321043296609, 419.86484619156334], 
        [593.4089826174095, 390.0077904623855], 
        [550.4894650067164, 423.59697815771057], 
        [578.4804547528206, 455.320099869962]
        ]]
      },
      "properties": {
        "name": "Vestiaire",
        "description":"Vous pouvez déposer ici vos affaires gratuitement. Ne perdez pas votre ticket ! (La technique c'est de le prendre en photo ;) )",
        "quote":"La pudeur est née avec l'invention du vêtement.",
        "author":"Mark Twain"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [278.04383147796864, 533.6948711590538],
        [341.4900749024715, 584.0786527020415],
        [371.34713063164935, 561.685860905158],
        [309.7669531902201, 507.5699473960232],
        [278.04383147796864, 533.6948711590538]
        ]]
      },
      "properties": {
        "name": "M104",
        "description":"Vous retrouverez ici un espace à thème, avec un scène étudiante.",
        "quote":"Je ne peux vivre sans Champagne en cas de victoire, je le mérite. En cas de défaite, j'en ai besoin.",
        "author":"Napoléon Bonaparte"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [278.04383147796864, 617.6678403973665],
        [233.25824788420186, 563.5519268882317],
        [278.04383147796864, 533.6948711590538],
        [343.35614088554513, 584.0786527020415],
        [278.04383147796864, 617.6678403973665]
        ]]
      },
      "properties": {
        "name": "M500",
        "description":"Salle de spectacle, début à 21h. Venez retrouver un spectacle à couper le souffle !",
        "quote":"Demain il sera 24h trop tard.",
        "author":"Timothée Toury"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [309.7669531902201, 505.7038814129496],
        [279.90989746104225, 533.6948711590538],
        [250.0528417318644, 500.1056834637288],
        [287.3741613933367, 483.3110896160663],
        [309.7669531902201, 505.7038814129496]
        ]]
      },
      "properties": {
        "name": "Espace calme",
        "description":"Envie d'un espace calme pour reposer tes oreilles et chiller ? Viens dans cette zone détente !",
        "quote":"Je suis morte et calme, je m'économise.",
        "author":"Jean-Paul Sartre"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [388.1417244793119, 610.203576465072],
        [419.86484619156334, 630.7303022788818],
        [447.85583593766756, 640.0606321942499],
        [483.3110896160663, 643.7927641603972],
        [492.64141953143434, 608.3375104819985],
        [453.4540338868884, 600.873246549704],
        [416.1327142254161, 582.2125867189678],
        [388.1417244793119, 610.203576465072]
        ]]
      },
      "properties": {
        "name": "Bar Revivre (sans alcool)",
        "description":"Ami Sam ce bar est fait pour toi ! Pas besoin d'alcool pour passer une bonne soirée.",
        "quote":"L'homme ne meurt que pour revivre.",
        "author":"Roch Carrier"
      }
    }
    ]};
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
  	this.x = -488116.608 * (-0.6039772381) * (this.lat - 48.267489);
  	this.y = 177399.3259 * (this.long - 4.063907);
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
  L.geoJSON(this.room, {
    style: this.style,
    onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
}).addTo(this.map);
  //layer.addData(rooms)

  }

  onEachFeature(feature, layer) {
    layer.on(
        'click', (e) => {
          this.roomData = e.target.feature.properties;
          console.log("[" + e.latlng.lng + ", " + e.latlng.lat + "]")
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










