import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { TimerComponent } from './timer/timer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ActivateGuard } from './activate.guard';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginguardGuard } from './loginguard.guard';
import { ScoresComponent } from './scores/scores.component';

const routes: Routes = [
  {path:"quiz",component:TimerComponent,canActivate:[LoginguardGuard]},
  {path:"result",component:ResultComponent,canActivate:[ActivateGuard]},
  {path:"homePage",component:HomepageComponent,canActivate:[LoginguardGuard]},
  {path:"score",component:ScoresComponent,canActivate:[LoginguardGuard]},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginPageComponent},
  {path:"register",component:RegisterPageComponent},
  { path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
