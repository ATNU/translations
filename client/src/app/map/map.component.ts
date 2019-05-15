import { Component, OnInit} from '@angular/core';
import { DateService } from '../services/date.service';
import { TranslationDataService } from '../services/translationData.service';
import { LocationModel } from "../models/location.model";

declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  selectedYear : number;
  mapImage: string;
  locationsList: LocationModel[];

constructor(
  private dateService: DateService,
  private translationService: TranslationDataService
  
)  { }

ngOnInit() { 
  //subscribe to the service data
  this.translationService.selectedLocations.subscribe(locationsList => this.locationsList = locationsList)
  this.dateService.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear)
  this.dateService.currentImage.subscribe(mapImage => this.mapImage  = mapImage )
  
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
}

}