import { Component, OnInit} from '@angular/core';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  selectedYear : number;
  mapImage: string;

constructor(private dateS: DateService) { }

ngOnInit() { 
  //subscribe to the service data
  this.dateS.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear)
  this.dateS.currentImage.subscribe(mapImage => this.mapImage  = mapImage )
}

}