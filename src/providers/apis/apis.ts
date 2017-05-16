import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WikiaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApisProvider {

  // static get parameters() {
  //     return [[Http]];
  // }

  constructor(private http: Http) {

  }

  searchWiki(search_param) {
    // var url = `http://starwars.wikia.com/api/v1/Articles/Details/?ids=1&abstract=100&width=200&height=200`;
    // var url = `http://starwars.wikia.com/api/v1/Search/List/?query=${search_param}&limit=1&namespaces=0%2C14`
    var url = `http://starwars.wikia.com/api/v1/Search/List?query=${search_param}&limit=1&minArticleQuality=10&batch=1&namespaces=0%2C14`;
    // var url = `http://starwars.wikia.com/api/v1/Search/List?query=${search_param}`;
    // var url = `http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix"`
    // var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(search_param) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;


  }
  getPeople(pageCount) {
    var url = `http://swapi.co/api/people/?page=${pageCount}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getShips(pageCount) {
    var url = `http://swapi.co/api/starships/?page=${pageCount}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getImages(id) {
    // console.log(id);
    var url = `http://starwars.wikia.com/api/v1/Articles/Details/?ids=${id}&abstract=100&width=200&height=200`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}