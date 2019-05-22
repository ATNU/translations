import { Component, OnInit} from '@angular/core';
import { DateService } from '../services/date.service';
import { TranslationDataService } from '../services/translationData.service';
import { LocationModel } from '../models/location.model';

declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  selectedYear: number;
 // mapImage: string;
  locationsList: LocationModel[];
  mymap: any;

constructor(
  private dateService: DateService,
  private translationService: TranslationDataService

)  { }

ngOnInit() {
  // subscribe to the service data
  this.translationService.selectedLocations.subscribe(locationsList => {
    this.locationsList = locationsList;
    this.addMapMarkers();
  });
  this.dateService.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear);
  // this.dateService.currentImage.subscribe(mapImage => this.mapImage  = mapImage);

  this.mymap = L.map('mapid').setView([51.16, 10.45], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.mymap);
}

addMapMarkers() {
  // add markers
  console.log(this.locationsList);

  for (let locationEntry of this.locationsList) {
    console.log('location entry loop');
  /*  L.marker([locationEntry.lattitude, locationEntry.longitude], {
      icon: new L.DivIcon({
          className: 'my-div-icon',
          html: '<span class="my-map-label">' + locationEntry.location + '</span>'
        })
    }).addTo(this.mymap);*/

    L.marker([locationEntry.lattitude, locationEntry.longitude]).addTo(this.mymap).bindPopup(locationEntry.location);
}
}
}
