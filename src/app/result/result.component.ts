import { Component, OnInit } from '@angular/core';
import { ResultShareService } from '../result-share.service';
import { Router } from '@angular/router';
import { ScoreObject } from 'src/scoreObject';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  selected : string[] = new Array<string>();
  correctAnswers : string[] = new Array<string>();
  score : number = 0;
  totalTime : number = 0;
  questions : string[] = new Array<string>();
  scoreObjectArray : ScoreObject[] = new Array<ScoreObject>();

  constructor(private resultShareService : ResultShareService,private route : Router) { }

  ngOnInit(): void {
    this.selected = this.resultShareService.getSelected();
    this.correctAnswers = this.resultShareService.getCorrectAnswers();

    for(let count=0;count<this.selected.length;count++){
      if(this.selected[count]==this.correctAnswers[count]){
        this.score=this.score+1;
      }
    }
    this.resultShareService.setScore(this.score);
    console.log(this.score);
    this.totalTime=this.resultShareService.getTime();
    this.questions=this.resultShareService.getQuestions();
    
    if(localStorage.getItem("scoreArray")==null){
      if(JSON.stringify(this.resultShareService.getScoreObject())!="{}"){
        this.scoreObjectArray.push(this.resultShareService.getScoreObject());
      }
      localStorage.setItem("scoreArray",JSON.stringify(this.scoreObjectArray));
    }
    else{
      this.scoreObjectArray=JSON.parse(localStorage.getItem("scoreArray"));
      if(JSON.stringify(this.resultShareService.getScoreObject())!="{}"){
        this.scoreObjectArray.push(this.resultShareService.getScoreObject());
      }
      localStorage.setItem("scoreArray",JSON.stringify(this.scoreObjectArray));
    }

    this.resultShareService.setScoreObjectArray(JSON.parse(localStorage.getItem("scoreArray")));

  }

  toHome(){
    this.resultShareService.updateTime(0);
    this.route.navigateByUrl("/homePage");
  }

}
