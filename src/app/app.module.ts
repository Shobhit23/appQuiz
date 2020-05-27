import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CountdownModule } from 'ngx-countdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TimerComponent } from './timer/timer.component';
import { ResultComponent } from './result/result.component';
import { ResultShareService } from './result-share.service';
import { HomepageComponent } from './homepage/homepage.component';
import { ClockComponent } from './clock/clock.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ScoresComponent } from './scores/scores.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ResultComponent,
    HomepageComponent,
    ClockComponent,
    NavbarComponent,
    HomeComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ScoresComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ResultShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
