import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  testTitle: string;
  selectedYear: number;

  constructor() { }

  ngOnInit() {
    //selectedYear is the value for the slider
    this.selectedYear=1789;
  }

}
