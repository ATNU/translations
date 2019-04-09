import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()

export class DateService {

  private yearSource = new BehaviorSubject<number>(1929);
  currentYear = this.yearSource.asObservable();

  constructor() { }

  changeSelectedYear(selectedYear: number){
    console.log('receievd by service' + selectedYear);
    this.yearSource.next(selectedYear);
    console.log(this.yearSource);
    console.log(this.currentYear);
  }
}
