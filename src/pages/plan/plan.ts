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
        [285.796875, 625.78125],
        [310.765625, 659.1875],
        [347.1953125, 631.828125],
        [347.2890625, 592.29296875],
        [347.546875, 592.21875],
        [341.359375, 584]
        ]]
      },
      "properties": {
        "name": "Hall N : Entrée",
        "description":"Entrée du Gala. Vous y retrouverez un point de rechargement et la billeterie.",
        "quote":"Demain il sera 24h trop tard.",
        "author":"Timothée Toury"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [435.1875, 508.6875],
        [462, 544.0625],
        [533.25, 490.25],
        [525.0625, 479.53125],
        [519.90625, 479.40625],
        [519.8125, 472.6875],
        [506.375, 454.71875]
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
        [566.25, 447.75],
        [573.25, 456.5],
        [628.5, 415.1875],
        [604.375, 383.125],
        [599.5, 379.125],
        [593.5, 376.125],
        [587.875, 374.125],
        [581.625, 373.25],
        [575.375, 373.5],
        [567.5, 375.25],
        [562, 378],
        [556.75, 381.75],
        [552.125, 386.75],
        [546.625, 396.5],
        [545, 403],
        [544.75, 411.5],
        [546.125, 419.625],
        [550, 426.625],
        [555.25, 433],
        [566.125, 433.125]
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
        [263.359375, 543.34375],
        [266.984375, 546.828125],
        [270.25, 549.015625],
        [275.71875, 552.890625],
        [280.9375, 556.546875],
        [285.8125, 560.015625],
        [291.03125, 563.796875],
        [325.609375, 588.34375],
        [363.625, 558.84375],
        [360, 556.890625],
        [355.28125, 554.203125],
        [351.15625, 551.59375],
        [347.046875, 548.96875],
        [342.28125, 546.015625],
        [337.671875, 542.96875],
        [332.140625, 538.875],
        [327.171875, 535.328125],
        [322.25, 531.390625],
        [317.578125, 527.4375],
        [313.515625, 523.8125],
        [308.9375, 519.15625],
        [305.328125, 515.4375],
        [301.546875, 511.1875]
        ]]
      },
      "properties": {
        "name": "[1er] M104 : Bar Club Ons et Esquisse",
        "description":"Espace à thème du Club Ons et Esquisse. Ambiance disco funk avec scène à l'intérieur. Coin canapé.",
        "quote":"Je ne peux vivre sans Champagne en cas de victoire, je le mérite. En cas de défaite, j'en ai besoin.",
        "author":"Napoléon Bonaparte"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [267.09375, 548.1875],
        [320.375, 585.828125],
        [278.9375, 617.046875],
        [241.140625, 568.1171875]
        ]]
      },
      "properties": {
        "name": "M500 : Salle de Spectacle",
        "description":"Début du spectacle à 21h. Venez retrouver un show à couper le souffle !",
        "quote":"Demain il sera 24h trop tard.",
        "author":"Timothée Toury"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [279.53125, 472.96875],
        [281.40625, 478.25],
        [283.3125, 483.0625],
        [285.59375, 487.6875],
        [287.46875, 491.40625],
        [289.875, 495.5],
        [292.875, 499.875],
        [295.1875, 503.28125],
        [298.96875, 508.21875],
        [301.34375, 511],
        [263.1171875, 543.09375],
        [261.5, 541.71875],
        [259.5, 539.78125],
        [257.03125, 537.21875],
        [255.15625, 534.90625],
        [253.0625, 531.96875],
        [249.9375, 528.0625],
        [247.0625, 524.25],
        [243.375, 519.09375],
        [240.4375, 514.09375],
        [238.34375, 510.34375],
        [235.59375, 505.0625],
        [233.375, 500.53125],
        [229.09375, 490.625],
        [226.6875, 483.5],
        [225.125, 477.78125],
        [224.3125, 474.65625]
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
        [413.25, 632.75],
        [424.1875, 636.5],
        [432.375, 638.8125],
        [441.25, 640.8125],
        [455.1875, 644.125],
        [465.5, 645.875],
        [466.125, 646.25],
        [472.875, 647.5],
        [482.6875, 598.28125],
        [477.125, 597.28125],
        [472.125, 596.21875],
        [466.96875, 595.21875],
        [459.5625, 593.375],
        [449.875, 591.0625],
        [438.75, 588.125],
        [428.25, 584.9375]
        ]]
      },
      "properties": {
        "name": "[RDC] Bar Revivre (sans alcool)",
        "description":"Espace SAM par l'association Revivre où des permanenciers sont là pour distribuer de l'eau, des softs. Ils ont des éthylotests à disposition.",
        "quote":"L'homme ne meurt que pour revivre.",
        "author":"Roch Carrier"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [598.25, 440],
        [667.5, 386.75],
        [681.25, 394.75],
        [696, 403.25],
        [706, 410.75],
        [719.5, 421.5],
        [732.25, 433.5],
        [740.75, 443.75],
        [724.5, 439.5],
        [712, 437],
        [687.5, 434.5],
        [668.75, 433.25],
        [647.25, 434],
        [622.5, 436.5],
        [606.75, 438.75]
        ]]
      },
      "properties": {
        "name": "Main Stage",
        "description":"Scène principale où Kavinsky, Uppermost et les artistes électroniques se produisent.",
        "quote":"Les danses modernes ? Ce n'est plus de la danse, c'est de la décadence.",
        "author":"Alfred Capus"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [517.890625, 430.765625],
        [519.625, 429.546875],
        [520.890625, 428.59375],
        [523.03125, 426.75],
        [525.125, 424.90625],
        [526.640625, 423.296875],
        [528.03125, 421.5625],
        [529.328125, 419.75],
        [530.90625, 417.484375],
        [532.3125, 415.015625],
        [534.015625, 411.515625],
        [534.53125, 409.796875],
        [535.296875, 407.625],
        [536.046875, 405],
        [536.546875, 402.328125],
        [536.9375, 398.625],
        [536.9375, 396.21875],
        [536.828125, 392.625],
        [536.5625, 389.5625],
        [536.046875, 386.421875],
        [535.40625, 383.71875],
        [534.640625, 381.375],
        [533.828125, 379.609375],
        [532.671875, 377.15625],
        [532.296875, 376.140625],
        [531.0625, 374.046875],
        [530.078125, 372.484375],
        [528.59375, 370.53125],
        [527.359375, 368.96875],
        [526.0625, 367.46875],
        [524.515625, 365.96875],
        [522.921875, 364.234375],
        [521.171875, 362.984375],
        [518.828125, 361.21875],
        [516.796875, 359.890625],
        [512.875, 357.796875],
        [508.046875, 355.859375],
        [505.890625, 355.21875],
        [501.15625, 354.328125],
        [495.921875, 354.015625],
        [491.3125, 354.203125],
        [486.359375, 355.03125],
        [482.703125, 356],
        [478.65625, 357.546875],
        [474.359375, 359.75],
        [469.953125, 362.65625],
        [467.234375, 365],
        [464.03125, 368.203125],
        [462.171875, 370.40625],
        [460.265625, 373.21875],
        [458.5625, 376.265625],
        [457.109375, 379.03125],
        [456.1875, 381.515625],
        [455.125, 384.59375],
        [454.375, 389.203125],
        [453.9375, 392.828125],
        [453.734375, 396.546875],
        [453.84375, 399.75],
        [454.703125, 404.609375],
        [455.5625, 407.84375],
        [456.6875, 411.1875],
        [458.15625, 414.4375],
        [460, 417.671875],
        [462, 420.546875],
        [464.515625, 423.71875],
        [468.40625, 427.375],
        [472.65625, 430.546875],
        [477.59375, 433.34375],
        [481.484375, 434.96875],
        [486.875, 436.484375],
        [492.390625, 437.1875],
        [495.40625, 437.296875],
        [500.6875, 436.984375],
        [504.875, 436.296875],
        [512.25, 433.75],
        [516.390625, 431.71875]
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
        [688.5625, 528.84375],
        [723.484375, 550.84375],
        [753.3125, 503.359375],
        [718.1640625, 481.421875]
        ]]
      },
      "properties": {
        "name": "Espace à thème Cocotte min'UTT x ISM",
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
        [382.703125, 405],
        [437.6171875, 394.328125],
        [429.546875, 353.609375],
        [374.6875, 364.421875]
        ]]
      },
      "properties": {
        "name": "Bar de l'EPF",
        "description":"Bar organisé par nos voisins de l'école polytechnique (anciennement) féminine.",
        "quote":"UTT allez aller aller...",
        "author":"Des nouveaux de l'EPF"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [567.375, 560.375],
        [569.75, 598],
        [615.75, 594.75],
        [613.125, 557.25]
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
        [647.75, 588.375],
        [691.34375, 574.625],
        [679.65625, 538.6875],
        [636.03125, 552.875]
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
        [520.015625, 433.359375],
        [519.9375, 479.34375],
        [566.046875, 479.328125],
        [566.01171875, 433.296875]
        ]]
      },
      "properties": {
        "name": "Point de Rechargement",
        "description":"Vous retrouverez ici un point de rechargement pour recharger votre compte cashless.",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [706, 565.3046875],
        [706.015625, 611.3671875],
        [752.03125, 611.375],
        [752.05078125, 565.2890625]
        ]]
      },
      "properties": {
        "name": "Point de Rechargement",
        "description":"Vous retrouverez ici un point de rechargement pour recharger votre compte cashless.",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [493.5, 599.875],
        [484.625, 649.125],
        [489.53125, 649.84375],
        [492.90625, 650.34375],
        [497.96875, 650.9375],
        [504.25, 651.625],
        [512.5625, 652.4375],
        [518.9375, 652.90625],
        [526.3125, 653.53125],
        [532.9375, 654],
        [537.03125, 653.9375],
        [538.75, 604.40625],
        [534.8125, 604.375],
        [529.53125, 603.96875],
        [521.09375, 603.21875],
        [512.28125, 602.40625],
        [503.5, 601.25],
        [497.6875, 600.6875],
        [495.65625, 600.34375]
        ]]
      },
      "properties": {
        "name": "[1er] Innov'UTT x Junior Conseil",
        "description":"Vous retrouverez ici un bar organisé par les associations Innov'UTT et Junior Conseil.",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [541.125, 654],
        [552.25, 654.25],
        [561.46875, 654.125],
        [568.96875, 654],
        [573.0625, 653.875],
        [582.21875, 653.65625],
        [589.5, 653.28125],
        [591.71875, 653.21875],
        [588.3125, 604.3125],
        [583.6875, 604.53125],
        [578.375, 604.84375],
        [570.4375, 605],
        [560.28125, 605.125],
        [551.09375, 605],
        [543.125, 604.78125],
        [542.375, 604.75]
        ]]
      },
      "properties": {
        "name": "[1er] Cabaret",
        "description":"Vous retrouverez ici un bar organisé dans le thème du cabaret, coorganisé par Fal'UTT et le club rock",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [605.3125, 651.90625],
        [609.03125, 651.671875],
        [613.046875, 651.15625],
        [618.375, 650.46875],
        [622.21875, 650.015625],
        [626.40625, 649.34375],
        [629.890625, 648.796875],
        [632.078125, 648.484375],
        [636.171875, 647.703125],
        [640.828125, 646.921875],
        [645.125, 646.0625],
        [650.921875, 644.625],
        [651.765625, 644.59375],
        [640.359375, 597.234375],
        [635.875, 598.265625],
        [631.15625, 599.15625],
        [626.3125, 599.953125],
        [620.90625, 600.921875],
        [615.84375, 601.609375],
        [611.40625, 602.203125],
        [606.859375, 602.609375],
        [602.4375, 603.203125],
        [600.140625, 603.328125]
        ]]
      },
      "properties": {
        "name": "[1er] Bar PMOM (MM askip)",
        "description":"Vous retrouverez ici un bar organisé par les PMOMs. Choucroute, cassoulet.",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [655.28125, 643.625],
        [658.5625, 642.75],
        [662.421875, 641.84375],
        [667.5625, 640.4375],
        [672.375, 639.203125],
        [676.703125, 637.859375],
        [681.703125, 636.328125],
        [686.265625, 634.71875],
        [690.875, 633.09375],
        [694.953125, 631.640625],
        [699.28125, 630.03125],
        [701.421875, 629.234375],
        [681.96875, 585.015625],
        [678.859375, 586.2109375],
        [675.6875, 587.3046875],
        [673.171875, 588.1484375],
        [670.3515625, 589.078125],
        [666.796875, 590.2265625],
        [663.546875, 591.234375],
        [660.6796875, 592.0859375],
        [657.03125, 593.203125],
        [654.3046875, 593.9296875],
        [651.2265625, 594.6328125],
        [647.8046875, 595.53125],
        [644.25, 596.3828125],
        [644.03125, 596.4765625]
        ]]
      },
      "properties": {
        "name": "[1er] Bar du RUTT",
        "description":"Vous retrouverez ici un bar organisé par le club de rugby de l'UTT : le RUTT",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [328.21875, 536.09375],
        [334.25, 540.625],
        [340.6875, 545],
        [350.03125, 551.0625],
        [358.71875, 556.03125],
        [366.09375, 560.1875],
        [402.21875, 533.15625],
        [399.0625, 531.203125],
        [396.75, 529.734375],
        [394.25, 527.859375],
        [390.65625, 524.578125],
        [386.875, 520.765625],
        [384.140625, 517.09375],
        [382.109375, 513.46875],
        [380.125, 509.53125],
        [378.671875, 505.21875],
        [377.515625, 501.046875],
        [376.984375, 497.59375]
        ]]
      },
      "properties": {
        "name": "Bar Amicale",
        "description":"Vous retrouverez ici un bar organisé par le personnel de l'UTT",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [314.96875, 461.609375],
        [317.046875, 465.5],
        [319.109375, 468.15625],
        [322, 471.3125],
        [326.875, 474.71875],
        [332.203125, 477.125],
        [336.84375, 478.3125],
        [340.796875, 478.59375],
        [343.96875, 478.5625],
        [346.171875, 478.25],
        [350.59375, 477.1875],
        [353.265625, 476.1875],
        [356.796875, 474.234375],
        [359.796875, 472.078125],
        [362.359375, 469.75],
        [364.8125, 466.828125],
        [367.0625, 463.28125],
        [368.71875, 459.40625],
        [369.765625, 456],
        [370.375, 452.421875],
        [370.375, 448.40625],
        [369.953125, 444.65625],
        [369.203125, 441.328125],
        [368.34375, 438.921875],
        [367.0625, 436.21875],
        [364.921875, 432.65625],
        [362.796875, 430.078125],
        [361.109375, 428.4375],
        [356.828125, 425.15625],
        [353.109375, 423.109375],
        [347.109375, 421.21875],
        [344.421875, 420.78125],
        [338.828125, 420.75],
        [333.40625, 421.765625],
        [330.828125, 422.640625],
        [326.421875, 424.84375],
        [322.578125, 427.609375],
        [319.46875, 430.765625],
        [317.421875, 433.40625],
        [315.296875, 436.890625],
        [314.015625, 440.015625],
        [312.734375, 444.171875],
        [312.375, 447.734375],
        [312.625, 452.421875],
        [313.0625, 456.4375],
        [314.46875, 460.484375]
        ]]
      },
      "properties": {
        "name": "Petit cercle",
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
        [347.34375, 638.359375],
        [393.3671875, 638.3046875],
        [393.41015625, 592.2578125],
        [347.34765625, 592.3125]
        ]]
      },
      "properties": {
        "name": "Point de Rechargement",
        "description":"Vous retrouverez ici un point de rechargement pour recharger votre compte cashless.",
        "quote": "L'influence est une nourriture.",
        "author":"Pierre Baillargeon"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [415.25, 580.5],
        [428.125, 585.0625],
        [439.9375, 588.625],
        [452.375, 591.8125],
        [468.0625, 595.3125],
        [472.25, 596.25],
        [461.25, 545.0625]
        ]]
      },
      "properties": {
        "name": "Espace à thème UNG",
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
    //var corner1 = L.latLng(0, 0),
    //corner2 = L.latLng(3000, 3000),
    //bounds = L.latLngBounds(corner1, corner2),
    var corner3 = L.latLng(0, 0),
    corner4 = L.latLng(1000, 1000),
    bounds2 = L.latLngBounds(corner3, corner4);
    this.map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1.4,
        zoomControl: true,
        zoomSnap: 1,
        scrollWheelZoom : true,
        touchZoom: true,
        doubleClickZoom: true,
        dragging: true,
        maxBounds: bounds2
    });
  	L.imageOverlay('assets/imgs/map.png', bounds2).addTo(this.map);
  	this.map.fitBounds(bounds2);
  	//L.marker([0, 0]).addTo(this.map);
    this.map.setView(new L.LatLng(420, 510));

    this.marker = L.marker([this.x, this.y]);
    this.marker.addTo(this.map);
   
    //L.marker([0, 0]).addTo(this.map);
    //L.marker([0, 1000]).addTo(this.map);
    //L.marker([1000, 1000]).addTo(this.map);
    //L.marker([1000, 0]).addTo(this.map);
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










