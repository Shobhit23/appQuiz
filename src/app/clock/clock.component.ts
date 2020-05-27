import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ResultShareService } from '../result-share.service';


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
message : string;
minute : string;
second : string;

  counter: number;
  totalTime : number = 0;
  @Output() finish : EventEmitter<any> = new EventEmitter<any>();


  constructor(private resultShareService : ResultShareService) {}

  ngOnInit(): void {
    this.counter=this.resultShareService.getPreference().numberOfQuestions*10;
    let intervalId = setInterval(() => {
        this.counter = this.counter - 1;
        this.totalTime = this.totalTime + 1;
        this.resultShareService.updateTime(this.totalTime);
        this.minute=Math.trunc(this.counter/60).toString();
        this.second=Math.trunc(this.counter%60).toString();
        if(Number(this.second)<10){
          this.second="0"+this.second;
        }
        if(Number(this.minute)<10){
          this.minute="0"+this.minute;
        }
        this.message=this.minute+":"+this.second;
        if(this.counter === 0) {
          clearInterval(intervalId);
          this.finish.emit(null);
        }
    }, 1000)
  
  }

}
