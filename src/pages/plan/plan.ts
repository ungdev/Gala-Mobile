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
    public geojson: any;
    public lastClicked: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.lastClicked = 0;
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
        [337.5, 583.9694690265487],
        [333.6875, 586.3486725663716],
        [328.75, 582.8424778761062],
        [282.5, 620.9151548672567],
        [295.875, 637.0946902654867],
        [184.1875, 724.4733407079646],
        [159.5, 724.8225663716814],
        [158.25, 743.8148230088495],
        [150.875, 744.4409292035398],
        [150.5, 746.6949115044248],
        [158.125, 746.945353982301],
        [158.5, 764.7267699115044],
        [160.125, 764.4763274336283],
        [160.25, 766.4798672566371],
        [190.375, 767.1059734513274],
        [190.625, 764.3511061946903],
        [192.625, 764.2258849557522],
        [191.875, 747.5714601769912],
        [310.28125, 658.2426991150443],
        [321.875, 672.7242256637168],
        [377.625, 629.2022123893805]
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
        [471.75, 482.2011061946903],
        [497.625, 513.9842920353982],
        [569.875, 457.9438053097345],
        [544, 425.69845132743365]
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
        [278.25, 535.3964601769911],
        [306, 561.6929203539823],
        [332.5, 581.7159292035399],
        [369.5, 550.1601769911505],
        [342.5, 529.6946902654868],
        [316.5, 505.6522123893805]
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
        [281, 613.2044247787611],
        [323.75, 580.1460176991151],
        [279.25, 541.1451327433629],
        [245.25, 566.4398230088495]
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
        [647.25, 415.66946902654865],
        [668.75, 392.3783185840708],
        [733, 448.11592920353985],
        [712.75, 472.158407079646]
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
        [734.375, 498.3336283185841],
        [714.375, 481.05309734513276],
        [687.75, 511.32389380530975],
        [707.75, 528.4692477876106]
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
        [447.75, 370.5929203539823],
        [492.375, 370.71814159292035],
        [492.5, 353.6880530973451],
        [447.5, 353.8132743362832]
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
        [611.5, 544.137168141593],
        [631, 542.8849557522124],
        [638.75, 556.4088495575221],
        [633.5, 570.9345132743363],
        [614.75, 572.9380530973451],
        [604, 558.412389380531]
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
        [570.25, 553.1530973451328],
        [579.25, 566.6769911504425],
        [573.75, 580.4513274336283],
        [557.5, 584.7088495575222],
        [546.25, 572.1867256637169],
        [552.375, 555.5772123893805]
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
        [318, 477.4566371681416],
        [326, 463.0561946902655],
        [342.5, 462.8057522123894],
        [351.375, 476.70530973451326],
        [345.375, 492.10752212389383],
        [324.625, 492.10752212389383]
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
        [321.375, 408.5887168141593],
        [326.5, 394.1882743362832],
        [346.125, 393.5621681415929],
        [354.625, 406.83561946902654],
        [347.75, 423.0891592920354],
        [328.5, 423.7152654867257]
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
        [496.75, 598.0716814159292],
        [491, 642.3464601769912],
        [507.875, 646.7269911504425],
        [524.375, 647.3530973451327],
        [538.5, 646.7285398230089],
        [538.75, 601.0754424778761]
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
        [542.75, 601.3234513274336],
        [543.25, 647.6769911504425],
        [564, 647.6769911504425],
        [587.125, 644.795796460177],
        [581.25, 599.1991150442478]
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
        [639.75, 584.695796460177],
        [598.75, 596.1933628318584],
        [609.25, 639.9641592920354],
        [634.5, 634.203982300885],
        [654.875, 627.224778761062]
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
        [644, 584.1380530973452],
        [682.25, 566.8575221238938],
        [705.75, 606.6778761061947],
        [658.75, 626.212389380531]
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
        [346.125, 528.8559734513275],
        [375.75, 549.679203539823],
        [387.5625, 540.4128318584071],
        [377.9375, 531.9671460176991],
        [369.25, 510.60077433628317]
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
        [424.75, 573.412389380531],
        [455.25, 584.1814159292036],
        [447.25, 554.1283185840708]
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
    console.log(event)
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
        minZoom: -1.4,
        zoomControl: true,
        zoomSnap: 1,
        scrollWheelZoom : true,
        touchZoom: true,
        doubleClickZoom: true,
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
    this.geojson = L.geoJSON(this.room, {
        style: this.style,
        onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
    }).addTo(this.map);
    //layer.addData(rooms)

  }

  onEachFeature(feature, layer) {
    layer.on(
        'click', (e) => {
          if(this.lastClicked != 0)
            this.geojson.resetStyle(this.lastClicked)
          this.roomData = e.target.feature.properties;
          if(this.roomData.name != "Plan Interactif"){
            e.target.setStyle({
                weight: 3,
                color: 'red',
                dashArray: '',
                fillOpacity: 0.2
            });
          }
          this.lastClicked = e.target;
          console.log("[" + e.latlng.lng + ", " + e.latlng.lat + "]")
        }
    );
  }
 
  style(feature) {
    return {
        fillColor: '#FFFFFF',
        weight: 2,
        opacity: 0,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0
    };
  }



}










