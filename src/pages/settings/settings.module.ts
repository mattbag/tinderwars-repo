import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    IonicStorageModule
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule {}
