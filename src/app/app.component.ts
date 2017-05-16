import { AppState } from './app.global';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TinderCardsPage } from './../pages/tinder/tinder-cards';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TinderCardsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
  public storage: Storage,public global: AppState) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: HomePage },
      { title: 'Home', component: TinderCardsPage },
      { title: 'I\'m a droid', component: 'ShipsPage' },
      { title: 'Settings', component: 'SettingsPage' },
      { title: 'About', component: 'AboutPage' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.global.set('theme', '');
      // this.global.set('themeCheck', false);
      this.storage.ready().then(() => {

       // set a key/value
      //  this.storage.set('name', 'Max');

       // Or to get a key/value pair
       this.storage.get('theme').then((val) => {
         if(val === 'sith-theme'){
          this.global.set('theme', 'sith-theme');
         }else{
           this.global.set('theme', '');
         }
        //  console.log('theme on: ', val);
       })
     });
      // console.log(this.global.state);
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.nav.push(page.component);
  }
}
