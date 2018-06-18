import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DialogflowService } from '@app/services';
import { MessageListComponent, MessageFormComponent, MessageItemComponent } from '@app/components'
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HistoryComponent } from './components/history/history.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'main',
    component: MainPageComponent,
    data: { title: 'Main Page' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: { title: 'History' }
  },
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageFormComponent,
    MessageItemComponent,
    LoginComponent,
    SignupComponent,
    MainPageComponent,
    HistoryComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2SmartTableModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    DialogflowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
