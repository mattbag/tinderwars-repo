import { Http } from '@angular/http';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApisProvider } from "../../providers/apis/apis";
import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';
/**
 * Generated class for the ShipsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ships',
  templateUrl: 'ships.html',
  providers: [ApisProvider]
})
export class ShipsPage {

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  pageCount: number = 1;
  swapi_ships: any;
  cards: Array<any>;
  stackConfig: StackConfig;
  showLoader: boolean;

  constructor(public navCtrl: NavController, public http: Http, //public toastCtrl: ToastService,
    private apis: ApisProvider
  ) {
    this.stackConfig = {
      throwOutConfidence: (offset, element: any) => {
        // console.log(element);
        // was element/2
        return Math.min(Math.abs(offset) / (element / 3), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      // console.log(event);

      // event.target.style.backgroundColor = '#ffffff';
      // event.target.style.background = '#ffffff';
      // console.log(event);

    });

    this.cards = [];
    this.showLoader = true;
    this.addNewCards(this.pageCount);
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    // console.log(element);

    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    let hexCode = this.decimalToHex(min, 2);

    if (x > 0) {
      color = '#' + hexCode + 'FF' + hexCode;
    } else {
      color = '#FF' + hexCode + hexCode;
    }

    // element.style.background = color;
    element.style.borderColor = color;
    // this.cardBG = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  // Connected through HTML
  voteUp(like: boolean) {
    this.cards.pop();
    // this.addNewCards(1);
    if (this.cards.length < 1) {
      console.log('going fetching');
      this.showLoader = true;
      this.addNewCards(this.pageCount);
    }
    // if (like) {
    //   this.toastCtrl.create('You liked: ' + removedCard.email);
    // } else {
    //   this.toastCtrl.create('You disliked: ' + removedCard.email);
    // }
  }

  // Add new cards to our array
  addNewCards(count: number) {
    // this.http.get('https://randomuser.me/api/?results=' + count)
    //   .map(data => data.json().results)
    //   .subscribe(result => {
    //     for (let val of result) {
    //       // this.cards.push(val);
    //       console.log(val);

    //     }
    //   })



    this.apis.getShips(this.pageCount).subscribe(
      data => {
        this.swapi_ships = data.results;
        // console.log(data);
        this.swapi_ships.map(x => {
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
                  // console.log(x);
                  this.cards.push(x);
                  // console.log(this.cards);


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
      () => {
        this.pageCount++ ,
          // console.log(this.pageCount);
          // this is meh
          setTimeout(() => { this.showLoader = false; }, 1000)
        console.log('Swapi Request Complete')
      }
    );


  }

  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }


}
