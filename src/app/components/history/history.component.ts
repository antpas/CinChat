import {Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent { 
  source: ServerDataSource;

  constructor(private router: Router, http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: 'https://cinchat.herokuapp.com/addmovie' });
  }

  settings = {
    delete: {
      confirmDelete: true,
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
        actors: 'Actors'
      },
      imdburl:{
        title: "IMDB URL"
      }
    }
  };

  home(){
    this.router.navigate(['main']);
  }
  
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
