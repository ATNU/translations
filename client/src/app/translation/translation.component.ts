import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { TranslationDataService } from '../services/translationData.service';
import { TranslationModel } from '../models/translation.model';
import {MatTableDataSource, MatSort, MatInputModule} from '@angular/material';


@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit, AfterViewInit {

  selectedYear: number;
  translationDataList: TranslationModel[];
  dataSource = new MatTableDataSource<TranslationModel>();
  constructor(
    private dateService: DateService,
    private translationService: TranslationDataService

  )  { }

  displayedColumns: string[] = ['type', 'originalTitle', 'originalAuthor', 'city'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dateService.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear);
    this.translationService.selectedTranslations.subscribe(translationDataList => {
      this.translationDataList = translationDataList;
      this.dataSource.data = this.translationDataList;
    });

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /*
  ***failed filter
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }*/

}
