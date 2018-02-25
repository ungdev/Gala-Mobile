import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 


@Component({
  selector: 'page-event-details',
  templateUrl: 'event_details.html'
})
export class EventDetailsPage{
  public id: number
  public title: string
  public text: string
  public room: string
  public start: string
  public end: string
  public img: string

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  ionViewDidLoad() {
  	 this.id = this.navParams.get('id');
  	 switch (this.id) {
  	 	case 1:
  	 		this.title = "Spectacle"
  	 		this.room = "M500"
  	 		this.start = "21h"
  	 		this.end = "22h30"
  	 		this.img = "spectacle"
  	 		this.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in pulvinar magna, eu pulvinar mi. Phasellus id eros ac lacus porta ultrices ornare eget justo. Etiam dignissim metus sed sapien tempus feugiat id nec leo. Vivamus mauris lorem, faucibus nec lectus quis, semper luctus dui. Sed malesuada dictum aliquam. Mauris rutrum magna nec massa tempor, id blandit augue interdum. Donec eros urna, luctus vitae suscipit ut, pulvinar eget justo. In vulputate quam eget sollicitudin iaculis. Fusce consequat facilisis vulputate. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed feugiat felis sed fermentum malesuada. Sed lobortis, risus sed pretium hendrerit, quam urna posuere quam, et volutpat ex est a magna. Ut vestibulum vulputate tempor. Cras nec convallis ipsum, vitae vestibulum metus. Aenean id arcu nisl. Proin pellentesque faucibus purus eget dignissim."
  	 		break;
  	 	case 2:
  	 		this.title = "Artiste Rock 1"
  	 		this.room = "Scène Rock"
  	 		this.start = "22h30"
  	 		this.end = "23h30"
  	 		this.img = "slash"
  	 		this.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in pulvinar magna, eu pulvinar mi. Phasellus id eros ac lacus porta ultrices ornare eget justo. Etiam dignissim metus sed sapien tempus feugiat id nec leo. Vivamus mauris lorem, faucibus nec lectus quis, semper luctus dui. Sed malesuada dictum aliquam. Mauris rutrum magna nec massa tempor, id blandit augue interdum. Donec eros urna, luctus vitae suscipit ut, pulvinar eget justo. In vulputate quam eget sollicitudin iaculis. Fusce consequat facilisis vulputate. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed feugiat felis sed fermentum malesuada. Sed lobortis, risus sed pretium hendrerit, quam urna posuere quam, et volutpat ex est a magna. Ut vestibulum vulputate tempor. Cras nec convallis ipsum, vitae vestibulum metus. Aenean id arcu nisl. Proin pellentesque faucibus purus eget dignissim."
  	 		break;
  	 	default:
  	 		this.title = "Spectacle"
  	 		this.room = "M500"
  	 		this.start = "21h"
  	 		this.end = "22h30"
  	 		this.img = "spectacle"
  	 		this.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in pulvinar magna, eu pulvinar mi. Phasellus id eros ac lacus porta ultrices ornare eget justo. Etiam dignissim metus sed sapien tempus feugiat id nec leo. Vivamus mauris lorem, faucibus nec lectus quis, semper luctus dui. Sed malesuada dictum aliquam. Mauris rutrum magna nec massa tempor, id blandit augue interdum. Donec eros urna, luctus vitae suscipit ut, pulvinar eget justo. In vulputate quam eget sollicitudin iaculis. Fusce consequat facilisis vulputate. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed feugiat felis sed fermentum malesuada. Sed lobortis, risus sed pretium hendrerit, quam urna posuere quam, et volutpat ex est a magna. Ut vestibulum vulputate tempor. Cras nec convallis ipsum, vitae vestibulum metus. Aenean id arcu nisl. Proin pellentesque faucibus purus eget dignissim."
  	 		break;
  	 }
  }


}
