import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { preference } from './preference';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultShareService } from '../result-share.service';
import { Router } from '@angular/router';
import { User } from 'src/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  categoryList : Object[] = new Array<Object>();
  preference : preference = new preference(null,"","");
  
  myForm = new FormGroup({
    numberOfQuestions : new FormControl(1,[Validators.required,Validators.min(1),Validators.max(30)]),
    category : new FormControl('',Validators.required),
    difficulty : new FormControl('',Validators.required)
  })

  constructor(private http : HttpClient,private resultShareService : ResultShareService,private route : Router) { }

  ngOnInit(): void {
    this.resultShareService.updateTime(null);
    this.http.get("https://opentdb.com/api_category.php").subscribe(
      data => {this.categoryList=(data["trivia_categories"]);
      }
      )
  }

  submit(){
    this.resultShareService.setPreference(this.myForm.value);
    this.resultShareService.updateTime(this.myForm.value.numberOfQuestions);
    this.route.navigateByUrl("/quiz");
  }

}
