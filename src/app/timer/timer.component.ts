import { Component, OnInit, Output } from '@angular/core';
import { Time } from '@angular/common';
import { result } from 'src/assets/result';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';
import { ResultShareService } from '../result-share.service';
import { preference } from '../homepage/preference';
import { ScoreObject } from 'src/scoreObject';
import { User } from 'src/user';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  resultList : result[] = new Array<result>();
  options : string[] = new Array<string>();
  optionsArray : string[][] = new Array<Array<string>>();
  shuffledOptionsArray : string[][] = new Array<Array<string>>();
  result : result = {"category":"","type":"","difficulty":"","question":"","correct_answer":"",
  "incorrect_answers":[""],"shuffledOptionsArray":[""][""],"options":[""]};
  selected : string[] = new Array<string>();
  correctAnswers : string[] = new Array<string>();
  preference : preference = new preference(null,"","");
  questions : string[] = new Array<string>();
  fetchStatus : boolean = false;
  scoreObject : ScoreObject = new ScoreObject("","",null,null,null);
  user : User = new User("","",[]);


  counter : number = 0;
  constructor(private http : HttpClient,private route : Router,private resultShareService : ResultShareService) { 
  }

  ngOnInit(): void {
    this.preference = this.resultShareService.getPreference();
    
    this.http.get("https://opentdb.com/api.php?amount="+
    this.preference.numberOfQuestions+"&category="+this.preference.category+
    "&difficulty="+this.preference.difficulty+"&type=multiple").subscribe(
      data => {
        if(data["results"][0]!=null){
          this.fetchStatus=true;
        }
        this.resultList=data["results"];
      data["results"].forEach(element => {
        this.questions.push(element["question"]);
        element["incorrect_answers"].forEach(element => {
          this.options.push(element);
        });
        this.options.push(element["correct_answer"]);
        this.optionsArray.push(this.options);
        this.options=[];
       });
       this.resultShareService.setQuestions(this.questions);
       this.optionsArray.forEach(element => {
         this.options=[];
         this.options=this.shuffleArray(element);
         this.shuffledOptionsArray.push(this.options);
         this.resultList[this.optionsArray.indexOf(element)].options=this.shuffledOptionsArray[this.optionsArray.indexOf(element)]
       });

      }
    )

    
  }

  shuffleArray(array : Array<string>) : Array<string> {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

  previous(){
    if(this.counter>0){
    this.counter=this.counter-1;
    }
  }
  next(){
    if(this.counter<this.resultList.length-1){
    this.counter=this.counter+1;
    }
  }

  show(option : string,counter : number){
    this.selected[counter]=option;
    this.next();
  }

  submit(){
    this.resultShareService.updateSelected(this.selected);
    this.resultList.forEach(element => {
      this.correctAnswers.push(element.correct_answer);
    });
    this.resultShareService.updateCorrectAnswers(this.correctAnswers);
    this.resultShareService.score.subscribe(data => this.scoreObject.obtainedMarks=data);
    this.scoreObject.maxMarks=this.questions.length;
    this.scoreObject.timeTaken=this.resultShareService.getTime();
    this.http.get("https://opentdb.com/api_category.php").
    subscribe(data => {this.scoreObject.category=data["trivia_categories"]
    [Number(this.resultShareService.getPreference().category)-9].name;
    this.scoreObject.difficulty=this.resultShareService.getPreference().difficulty;
    this.resultShareService.score.subscribe(data => {this.scoreObject.obtainedMarks=data;
    this.resultShareService.setScoreObject(this.scoreObject);
    this.resultShareService.user.subscribe(data => this.user=data);
    });
    this.route.navigateByUrl("/result");
  })
  }

  toHome(){
    this.resultShareService.updateTime(0);
  this.route.navigateByUrl("/homePage");
  }
}
