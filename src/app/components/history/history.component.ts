import {Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { Http, Headers } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

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
      delete: false,
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
        title: "IMDB URL",
        type: "html"
      }
    },
    attr: {
      class: 'table table-bordered'
    }
  };

  ngOnInit() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get('/api/main', httpOptions).subscribe(data => {
      console.log(data)
    }, err => {
      if(err) {
        this.router.navigate(['login']);
      }
    });
  }
  
  home(){
    this.router.navigate(['main']);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }
  
  clear(){
  
    this.http.delete('https://cinchat.herokuapp.com/addmovie').subscribe(data => {
      console.log(data)
      window.location.reload();
    }, err => {
      if(err) {
        console.log(err)
      }
    });
  }
}
