import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BioPage } from './bio';

@NgModule({
  declarations: [
    BioPage,
  ],
  imports: [
    IonicPageModule.forChild(BioPage),
  ],
  exports: [
    BioPage
  ]
})
export class BioPageModule {}
