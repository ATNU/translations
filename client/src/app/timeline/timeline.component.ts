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
    ticksArray: this.dateS.existingYears, //existingYears is a list of all years which have associated images, ticks will show for these years
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
    this.labelYears = [1789, 1804, 1820, 1839, 1861, 1885, 1911, 1929]; //these are the years that show noted below the timeline, cut down from full list for visibility
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




  pauseTimeline() {
    //function to pause the play timeline function
    console.log("pause");

  }

  trythis(updateNo : number){
    console.log('called trythis' + updateNo);
    this.selectedYear = updateNo;
  }



  playTimeline() {
    const delay = (amount: number, test : number) => {
      this.selectedYear = test;
      this.sendValue();
      return new Promise((resolve) => {
        setTimeout(resolve, amount);
      });
    };

    

    async function loop() {
      for (let i = 1789; i <= 1850; i++) {
        console.log(i);
        await delay(300, i);
      }
    }
    
    loop();
  }

}

