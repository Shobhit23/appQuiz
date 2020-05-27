import { Component, OnInit } from '@angular/core';
import { ScoreObject } from 'src/scoreObject';
import { ResultShareService } from '../result-share.service';
import { User } from 'src/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  constructor(private resultShareService : ResultShareService,private route : Router) { }
  scoreObjectArray : ScoreObject[] = new Array<ScoreObject>();

  ngOnInit(): void {
    
    if(localStorage.getItem("scoreArray")!=null){
      this.scoreObjectArray=JSON.parse(localStorage.getItem("scoreArray"));
      console.log(JSON.parse(localStorage.getItem("scoreArray")));
    }
  }

  tohomePage(){
    this.route.navigateByUrl("/homePage");
  }

}
