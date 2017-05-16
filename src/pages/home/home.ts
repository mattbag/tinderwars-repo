import { ApisProvider } from './../../providers/apis/apis';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApisProvider]
})
export class HomePage {
  wiki_data: any;
  swapi_people: any;
  constructor(public navCtrl: NavController, private apis: ApisProvider) {

    this.apis.getPeople(1).subscribe(
      data => {
        this.swapi_people = data.results;
        // console.log(data);
        this.swapi_people.map(x => {
          // console.log(x);

          this.apis.searchWiki(x.name).subscribe(
            data => {
              // this.wiki_data = data.results; 
              // console.log(data.items[0].id);
              let _id = data.items[0].id;
              this.apis.getImages(_id).subscribe(
                data => {
                  // this.wiki_data = data.results; 
                  // console.log(data);
                  x.img = data.items[_id].thumbnail;
                  console.log(x);
                  
                },
                err => {
                  console.log(err);
                },
                () => console.log('Image map Complete')
              );
            },
            err => {
              console.log(err);
            },
            () => console.log('Wikia Search Complete')
          );
        })
      },
      err => {
        console.log(err);
      },
      () => console.log('Swapi Request Complete')
    );

  }

}
