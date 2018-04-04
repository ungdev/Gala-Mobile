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
  	public alt: number;f
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
        [195.93692822272956, 752.0245911786668],
        [313.4990851563673, 662.4534239911333],
        [320.96334908866174, 675.5158858726486],
        [380.67746054701746, 632.5963682619555],
        [341.4900749024715, 582.2125867189678],
        [287.3741613933367, 621.3999723635137],
        [294.83842532563114, 636.3285002281027],
        [169.81200445969895, 737.0960633140779],
        [164.21380651047812, 765.0870530601821],
        [195.93692822272956, 766.9531190432557],
        [195.93692822272956, 750.1585251955931]
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
        "description":"Si tu finis en pls, tu te réveilleras sûrement là bas :) ",
        "quote":"C'est deux fois secourir un malheureux que de le secourir promptement.",
        "author":"Publius Syrus"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [580.3465207358943, 455.320099869962],
        [634.462434245029, 416.1327142254161],
        [606.4714444989248, 382.54352653009107],
        [589.6768506512623, 376.9453285808702],
        [572.8822568035997, 376.9453285808702],
        [561.685860905158, 382.54352653009107],
        [554.2215969728636, 390.0077904623855],
        [546.7573330405692, 403.0702523439008],
        [546.7573330405692, 404.93631832697446],
        [546.7573330405692, 421.73091217463696],
        [556.0876629559373, 434.7933740561523],
        [580.3465207358943, 455.320099869962]
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
        "description":"Vous retrouverez ici un espace à thème, avec une scène étudiante.",
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
        [276.177765494895, 533.6948711590538],
        [319.09728310558813, 503.837815429876],
        [298.57055729177836, 473.9807597006982],
        [244.45464378264356, 483.3110896160663],
        [251.918907714938, 503.837815429876],
        [259.3831716472325, 518.766343294465],
        [276.177765494895, 533.6948711590538]
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
        [395.60598841160635, 613.9357084312193],
        [404.93631832697446, 621.3999723635137],
        [421.73091217463696, 632.5963682619555],
        [440.3915720053731, 638.1945662111763],
        [455.320099869962, 640.0606321942499],
        [472.11469371762456, 641.9266981773235],
        [479.578957649919, 645.6588301434707],
        [481.4450236329926, 599.0071805666304],
        [470.24862773455095, 595.2750486004832],
        [449.7219019207412, 589.6768506512623],
        [436.6594400392259, 585.944718685115],
        [423.59697815771057, 584.0786527020415],
        [395.60598841160635, 612.0696424481457]
        ]]
      },
      "properties": {
        "name": "Bar Revivre (sans alcool)",
        "description":"Ami Sam ce bar est fait pour toi ! Pas besoin d'alcool pour passer une bonne soirée.",
        "quote":"L'homme ne meurt que pour revivre.",
        "author":"Roch Carrier"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [669.9176879234277, 395.60598841160635],
        [651.2570280926916, 416.1327142254161],
        [714.7032715171945, 473.9807597006982],
        [735.2299973310043, 451.5879679038148],
        [669.9176879234277, 395.60598841160635]
        ]]
      },
      "properties": {
        "name": "Scène électro",
        "description":"Vous retrouverez ici tous les DJs du Gala. Uppermost, Kavinsky, ils seront tous là. ",
        "quote":"Les danses modernes ? Ce n'est plus de la danse, c'est de la décadence.",
        "author":"Alfred Capus"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [429.1951761069314, 388.1417244793119],
        [429.1951761069314, 419.86484619156334],
        [515.0342113283177, 419.86484619156334],
        [515.0342113283177, 388.1417244793119]
        ]]
      },
      "properties": {
        "name": "Scène Rock'n roll",
        "description":"Vous retrouverez ici tous les groupes de Rock du Gala.",
        "quote":"Les danses modernes ? Ce n'est plus de la danse, c'est de la décadence.",
        "author":"Alfred Capus"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [716.5693375002681, 483.3110896160663],
        [690.4444137372375, 515.0342113283177],
        [705.3729416018265, 531.8288051759803],
        [735.2299973310043, 501.9717494468024],
        [716.5693375002681, 483.3110896160663]
        ]]
      },
      "properties": {
        "name": "Bar",
        "description":"Plus d'informations prochainement...",
        "quote":"Bar Bar Bar Bar BarBar Bar BarBar",
        "author":"Darth Vader"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [449.7219019207412, 354.55253678398685],
        [451.5879679038148, 371.34713063164935],
        [496.37355149758156, 373.21319661472296],
        [494.50748551450795, 356.41860276706046]
        ]]
      },
      "properties": {
        "name": "Bar",
        "description":"Plus d'informations prochainement...",
        "quote":"Bar Bar Bar Bar BarBar Bar BarBar",
        "author":"Darth Vader"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [630.7303022788818, 539.2930691082747],
        [647.5248961265444, 565.4179928713053],
        [621.3999723635137, 585.944718685115],
        [599.0071805666304, 559.8197949220845],
        [630.7303022788818, 539.2930691082747]
        ]]
      },
      "properties": {
        "name": "Food Truck 1",
        "description":"Vous retrouverez ici de la nourriture pour vous sustenter.",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [567.2840588543789, 546.7573330405692],
        [589.6768506512623, 571.0161908205262],
        [561.685860905158, 599.0071805666304],
        [531.8288051759803, 569.1501248374525]
        ]]
      },
      "properties": {
        "name": "Food Truck 2",
        "description":"Vous retrouverez ici de la nourriture pour vous sustenter.",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [334.0258109701771, 503.837815429876],
        [362.0168007162813, 477.7128916668454],
        [341.4900749024715, 451.5879679038148],
        [306.03482122407286, 473.9807597006982]
        ]]
      },
      "properties": {
        "name": "Food Truck 3",
        "description":"Vous retrouverez ici de la nourriture pour vous sustenter",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [341.4900749024715, 436.6594400392259],
        [369.48106464857574, 412.4005822592689],
        [339.6240089193979, 382.54352653009107],
        [307.90088720714647, 410.5345162761953]
        ]]
      },
      "properties": {
        "name": "Food Truck 4",
        "description":"Vous retrouverez ici de la nourriture pour vous sustenter",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [500.1056834637288, 597.1411145835567],
        [492.64141953143434, 643.7927641603972],
        [518.766343294465, 651.2570280926916],
        [543.025201074422, 649.3909621096179],
        [541.1591350913483, 602.7393125327776]
        ]]
      },
      "properties": {
        "name": "Espace à thème 1",
        "description":"Vous retrouverez ici un bar organisé par une association de l'UTT",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [543.025201074422, 602.7393125327776],
        [544.8912670574955, 649.3909621096179],
        [567.2840588543789, 653.1230940757653],
        [589.6768506512623, 649.3909621096179],
        [584.0786527020415, 599.0071805666304]
        ]]
      },
      "properties": {
        "name": "Espace à thème 2",
        "description":"Vous retrouverez ici un bar organisé par une association de l'UTT",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [597.1411145835567, 599.0071805666304],
        [608.3375104819985, 649.3909621096179],
        [656.8552260419125, 630.7303022788818],
        [641.9266981773235, 587.8107846681887]
        ]]
      },
      "properties": {
        "name": "Espace à thème 3",
        "description":"Vous retrouverez ici un bar organisé par une association de l'UTT",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [656.8552260419125, 632.5963682619555],
        [709.1050735679737, 610.203576465072],
        [686.7122817710903, 569.1501248374525],
        [647.5248961265444, 587.8107846681887]
        ]]
      },
      "properties": {
        "name": "Espace à thème 4",
        "description":"Vous retrouverez ici un bar organisé par une association de l'UTT",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [345.22220686861874, 533.6948711590538],
        [382.54352653009107, 557.9537289390108],
        [406.80238431004807, 533.6948711590538],
        [373.21319661472296, 507.5699473960232]
        ]]
      },
      "properties": {
        "name": "Bar",
        "description":"Plus d'information à l'approche du Gala...",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [425.4630441407842, 578.4804547528206],
        [479.578957649919, 593.4089826174095],
        [466.51649576840373, 544.8912670574955]
        ]]
      },
      "properties": {
        "name": "Bar",
        "description":"Plus d'information à l'approche du Gala...",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
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
            //console.log("lat : " + this.lat + " long : " + this.long + " alt : " + this.alt)
      }).catch((error) => {
            //console.log('Error getting location', error);
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
          //console.log("[" + e.latlng.lng + ", " + e.latlng.lat + "]")
        }
    );
  }
 
  style(feature) {
    return {
        fillColor: '#FFEDA0',
        weight: 2,
        opacity: 0,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0
    };
  }



}










