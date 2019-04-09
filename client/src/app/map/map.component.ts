import { Component, OnInit} from '@angular/core';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [DateService]
})
export class MapComponent implements OnInit {

  selectedYear : number;

constructor(private dateS: DateService) { }

ngOnInit() { 
  this.dateS.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear)
}

}