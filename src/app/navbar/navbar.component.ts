import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultShareService } from '../result-share.service';
import { User } from 'src/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn :boolean = false;
  user : User = new User("","",[]);

  constructor(private route : Router,private resultShareService : ResultShareService) { }

  ngOnInit(): void {
    this.resultShareService.loggedInStatus.subscribe(data => this.loggedIn=data);
    this.resultShareService.user.subscribe(data => this.user=data);
  }

  toHome(){
    this.resultShareService.loggedInStatus.next(false);
    localStorage.removeItem("scoreArray");
    this.route.navigateByUrl("/home");
  }

  toLogin(){
    localStorage.removeItem("scoreArray");
    this.route.navigateByUrl("/login");
  }

  viewMyScores(){
    this.route.navigateByUrl("/score");
  }

  tohomePage(){
    this.route.navigateByUrl("/homePage");
  }

}
