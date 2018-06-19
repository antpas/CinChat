import {Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { Http,Headers } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

@Injectable()
export class HistoryComponent { 
  source: ServerDataSource;

  constructor(private router: Router, private http: HttpClient, private httpx: Http) {
    this.source = new ServerDataSource(http, { endPoint: 'https://cinchat.herokuapp.com/addmovie' });
  }

  settings = {
    actions: { 
      // delete: false,
      edit: false
    },
    columns: {
      title: {
        title: 'Title'
      },
      director: {
        title: 'Director'
      },
      year: {
        title: 'Year'
      },
      actors: {
        title: 'Actors'
      },
      imdburl:{
        title: "IMDB URL"
      }
    }
  };

  home(){
    this.router.navigate(['main']);
  }
  
  clear(){
      let URI = `https://cinchat.herokuapp.com/addmovie/`;
      let headers = new Headers;
      headers.append('Content-Type', 'application/json');
      return this.httpx.delete(URI, {headers})
      .map(res => res.json());
  }
}
