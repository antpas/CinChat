import { Message } from '@app/models';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  public message : Message;
  public messages : Message[];


   constructor(private http: HttpClient, private router: Router)
  {
    this.message = new Message('', 'assets/images/user.png');
    this.messages = [
      new Message('Welcome to chatbot universe', 'assets/images/bot.png', new Date())
    ];
  }

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
  
  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }
}


