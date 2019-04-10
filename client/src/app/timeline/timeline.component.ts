import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
/*
  selectedYear: number;

  constructor() { }

  ngOnInit() {
    //selectedYear is the value for the slider
    this.selectedYear=1789;
  }

  playTimeline() {
    //function to auto increment the selected year and reflect on the page until it reaches the end of the timeline
    console.log("play");
  }
*/

selectedYear : number;

constructor(private dateS: DateService) { }

ngOnInit() { 
  this.dateS.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear)
}

sliderChange(value : number){
  console.log('sending over year to the service' + this.selectedYear);
  this.dateS.changeSelectedYear(this.selectedYear);
}

sendValue(){
  console.log('sending over year to the service 2' + this.selectedYear);
  this.dateS.changeSelectedYear(this.selectedYear);
}

}
