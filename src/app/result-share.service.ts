import { Injectable } from '@angular/core';
import { preference } from './homepage/preference';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/user';
import { ScoreObject } from 'src/scoreObject';

@Injectable({
  providedIn: 'root'
})
export class ResultShareService {

  constructor() { }

  selected : string[] = new Array<string>();
  correctAnswers : string[] = new Array<string>();
  time : number;
  preference : preference = new preference(null,"","");
  questions : string[] = new Array<string>();
  loggedInStatus : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userPass : User = new User("","",[]);
  user : BehaviorSubject<User>= new BehaviorSubject<User>(this.userPass);
  scoreObject : ScoreObject = new ScoreObject("","",null,null,null);
  score : BehaviorSubject<number> = new BehaviorSubject<number>(null);
  scoreObjectArray : ScoreObject[] = new Array<ScoreObject>();

  updateSelected(selected : string[]){
    this.selected=selected;
  }

  updateCorrectAnswers(correctAnswers : string[]){
    this.correctAnswers=correctAnswers;
  }

  updateTime(time : number){
    this.time=time;
  }

  getSelected(){
    return this.selected;
  }

  getCorrectAnswers(){
    return this.correctAnswers;
  }

  getTime(){
    return this.time;
  }

  setPreference(preference : preference){
    this.preference=preference;
  }

  getPreference(){
    return this.preference;
  }

  setQuestions(questions : string[]){
    this.questions=questions;
  }

  getQuestions(){
    return this.questions;
  }

  setLoggedInStatus(loggedInStatus : boolean){
    this.loggedInStatus.next(loggedInStatus);
  }

  setUser(user : User){
    this.userPass.username=user.username;
    this.userPass.password=user.password;
    this.userPass.scoreObjectArray=user.scoreObjectArray;
    this.user.next(this.userPass);
  }

  setScoreObject(scoreObject : ScoreObject){
    this.scoreObject.category=scoreObject.category;
    this.scoreObject.difficulty=scoreObject.difficulty;
    this.scoreObject.maxMarks=scoreObject.maxMarks;
    this.scoreObject.obtainedMarks=scoreObject.obtainedMarks;
    this.scoreObject.timeTaken=scoreObject.timeTaken;
  }

  getScoreObject(){
    return this.scoreObject;
  }

  setScore(score : number){
    this.score.next(score);
  }

  setScoreObjectArray(scoreObjectArray : ScoreObject[]){
    this.scoreObjectArray=scoreObjectArray;
  }

  getScoreObjectArray(){
    return this.scoreObjectArray;
  }

}
