import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {

  selectedYear : number;

  constructor(private dateS: DateService) { }

  ngOnInit() {

    this.dateS.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear)
  }

}
