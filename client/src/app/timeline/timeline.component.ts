import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { TranslationDataService } from '../services/translationData.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  selectedYear: number;

  labelYears: number[];

  disableTimeline: boolean;

  timelinePaused: boolean;

  // Options for the timeline
  options: Options = {
    floor: 1789,
    ceil: 1929,
    ticksArray: this.dateService.mapTicks,
    getLegend: (value: number): string => {
      if (this.labelYears.includes(value)) {
        return value.toString();
      }
    }

  };

  constructor(
      private dateService: DateService,
      private translationService: TranslationDataService
    ) {
  }

  ngOnInit() {
    this.dateService.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear);
    this.dateService.isPaused.subscribe(timelinePaused => this.timelinePaused = timelinePaused);
    this.labelYears = this.dateService.mapLegend;
    /* these are the years that show noted below the timeline, cut down from full list for visibility,
    the year must also have an associated tick in the ticksarray */
    this.disableTimeline = false;
    this.onChangeDisabled();
  }

  clickTimeline() {
    this.pauseTimeline();
    this.sendValue();
  }

  sendValue() {
    this.dateService.changeSelectedYear(this.selectedYear);
    this.translationService.getTranslationData(this.selectedYear);
  }

  refreshTimeline() {
    this.pauseTimeline();
    this.selectedYear = 1789;
    this.dateService.changeSelectedYear(this.selectedYear);
    this.sendValue();
  }

  pauseTimeline() {
    this.dateService.pauseLoop(true);
  }

  playTimeline() {
    this.dateService.pauseLoop(false);

    const delay = (amount: number, updateNo: number) => {
      this.selectedYear = updateNo;
      this.sendValue();
      return new Promise((resolve) => {
        setTimeout(resolve, amount);
      });
    };

    const checkPaused = () => {
      if (this.timelinePaused === true) {
        return true;
      } else {
        return false;
      }
    };

   async function timeLoop(startYear: number) {
      for (let i = startYear; i <= 1929; i++) {

        const check = checkPaused();
        if (check === false) {
          await delay(5000, i);
        } else {
          break;
        }

      }
    }

    timeLoop(this.selectedYear);

  }

  showAllData() {
    this.disableTimeline = true;
    this.onChangeDisabled();
    this.translationService.getAllTranslationData();
  }

  showYearData() {
    this.selectedYear = 1789;
    this.sendValue();
    this.disableTimeline = false;
    this.onChangeDisabled();
  }

  onChangeDisabled(): void {
    this.options = Object.assign({}, this.options, {disabled: this.disableTimeline});
  }

}

