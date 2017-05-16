import { AppState } from './app.global';
import { TinderCardsPage } from './../pages/tinder/tinder-cards';
import { ApisProvider } from './../providers/apis/apis';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@NgModule({
  declarations: [
    MyApp,
    TinderCardsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    SwingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TinderCardsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApisProvider,
    AppState
  ]
})
export class AppModule {}
