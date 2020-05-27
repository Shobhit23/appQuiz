import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  toggle : boolean = false;
  show: boolean = false;

  myRegisterForm = new FormGroup(
    {
      username : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required)
    }
  )

  constructor(private route : Router) { }

  ngOnInit(): void {
  }

  toLogin(){
    this.route.navigateByUrl("/login");
  }

  submit(){
    localStorage.setItem("user",JSON.stringify(this.myRegisterForm.value));
    this.myRegisterForm.reset();
    this.toggle=true;
  }

  password() {
    this.show = !this.show;
  }

}
