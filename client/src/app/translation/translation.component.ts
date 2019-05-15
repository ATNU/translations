import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { TranslationDataService } from '../services/translationData.service';
import { TranslationModel } from '../models/translation.model';


@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {

  selectedYear : number;
  translationDataList: TranslationModel[];

  constructor(
    private dateService: DateService,
    private translationService: TranslationDataService
    
  )  { }

  ngOnInit() {

    this.dateService.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear)
    this.translationService.selectedTranslations.subscribe(translationDataList => this.translationDataList = translationDataList)
  }

}
