import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultShareService } from '../result-share.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private route : Router,private resultShareService : ResultShareService) { }
  show: boolean = false;
  incorrect : boolean = false;
  register : boolean = false;

  myLoginForm = new FormGroup(
    {
      username : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required)
    }
  )


  ngOnInit(): void {
  }

  submit(){
    if(localStorage.getItem("user")!=null){
    if(this.myLoginForm.value.username==JSON.parse(localStorage.getItem("user")).username  &&
      this.myLoginForm.value.password==JSON.parse(localStorage.getItem("user")).password){
      this.incorrect=false;
      this.resultShareService.setLoggedInStatus(true);
      this.resultShareService.setUser(this.myLoginForm.value);
      this.route.navigateByUrl('/homePage');
    }
    else{
      this.resultShareService.setLoggedInStatus(false);
      this.incorrect=true;
    }
  }
  else{
    this.resultShareService.setLoggedInStatus(false);
    this.register=true;
  }
  }

  toNewUser(){
    this.route.navigateByUrl('/register');
  }

  password() {
    this.show = !this.show;
  }

}
