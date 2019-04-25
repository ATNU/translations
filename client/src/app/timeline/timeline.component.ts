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

  pauseLoop : boolean;

  //options for the timeline 
  options: Options = {
    floor: 1789,
    ceil: 1929,
    ticksArray: this.dateS.existingYears, //existingYears is a list of all years which have associated images, ticks will show for these years
    getLegend: (value: number): string => {
      //put a if statement in here to check if value exists then show legend
      if(this.labelYears.includes(value)){
        return value.toString();
      }
    }
    
  };

  constructor(private dateS: DateService) { 
    
  }

  ngOnInit() { 
    this.dateS.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear)
    this.labelYears = [1789, 1804, 1820, 1839, 1861, 1885, 1911, 1929]; //these are the years that show noted below the timeline, cut down from full list for visibility
    //using self as this so that the context remains the same in the async function loop, otherwise loop cannot access the variable pauseLoop, pauseLoop is also declared on the window in lib.dom.ts
    var self = this;
    self.pauseLoop = false;
  }


  //action on timeline change
  sendValue(){
    console.log('sending over year to the service ' + this.selectedYear);
    this.dateS.changeSelectedYear(this.selectedYear);
  }

  refreshTimeline(){
    console.log('refresh');
    this.selectedYear = 1789;
    this.dateS.changeSelectedYear(this.selectedYear);
    console.log('selected year' + this.selectedYear);
  }

  pauseTimeline() {
    //function to pause the play timeline function
    console.log("pause");
    self.pauseLoop = true;
  }


  //enhance this by having play resume rather than play from beginning each time.

  playTimeline() {
    self.pauseLoop = false;
    const delay = (amount: number, updateNo : number) => {
      this.selectedYear = updateNo;
      this.dateS.changeSelectedYear(this.selectedYear);
      return new Promise((resolve) => {
        setTimeout(resolve, amount);
      });
    };

    

    async function loop(startYear : number) {
      for (let i = startYear; i <= 1929; i++) {
        if(self.pauseLoop == true){
          break;
        }
        console.log(i);
        await delay(300, i);
      }
    }
    
    loop(this.selectedYear);
    
  }

}

