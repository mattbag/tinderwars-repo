import { AppState } from './../../app/app.global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bio',
  templateUrl: 'bio.html',
})
export class BioPage {
  person: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, public global: AppState ) {
  
}

  ionViewDidLoad() {
    // console.log('Person', this.navParams.get('person'));
    this.person = this.navParams.get('person');
    console.log(this.global.state['theme']);
    
  }
  closeModal() {
  //  let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss();
 }

}
