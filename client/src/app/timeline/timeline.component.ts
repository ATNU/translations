import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { interval } from 'rxjs';
import {observable } from 'rxjs';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

selectedYear : number;

labelYears: number[];


options: Options = {
  floor: 1789,
  ceil: 1929,
  ticksArray: this.dateS.existingYears,
  getLegend: (value: number): string => {
    //put a if statement in here to check if value exists then show legend
    if(this.labelYears.includes(value)){
      return value.toString();
    }
  }
  
};

constructor(private dateS: DateService) { }

ngOnInit() { 
  this.dateS.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear)
  this.selectedYear = 1829;
  this.labelYears = [1789, 1795, 1804, 1812, 1820, 1830, 1839, 1848, 1861, 1871, 1885, 1911, 1921, 1929];
}

//unused currently
sliderChange(value : number){
  console.log('sending over year to the service' + this.selectedYear);
  this.dateS.changeSelectedYear(this.selectedYear);
}

//action on timeline change
sendValue(){
  console.log('sending over year to the service ' + this.selectedYear);
  this.dateS.changeSelectedYear(this.selectedYear);
}

playTimeline() {
  //function to auto increment the selected year and reflect on the page until it reaches the end of the timeline
  console.log("play");
  //probably calling send value in a loop on a time delay?
  
  
}


pauseTimeline() {
  //function to pause the play timeline function
  console.log("pause");

}

}

