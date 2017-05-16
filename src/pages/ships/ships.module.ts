import { SwingModule } from 'angular2-swing';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipsPage } from './ships';

@NgModule({
  declarations: [
    ShipsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipsPage),
    SwingModule
  ],
  exports: [
    ShipsPage
  ]
})
export class ShipsPageModule {}
