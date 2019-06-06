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
  mapImage: string;
  locationsList: LocationModel[];
  mymap: any;
  markers: any;
  imageLine: any;
  overlays: any;
  imageBounds: number[][];
  histMapON: boolean;

  constructor(
    private dateService: DateService,
    private translationService: TranslationDataService
  )  { }

  ngOnInit() {
    this.markers = L.markerClusterGroup();
  // this.overlays =  new L.LayerGroup();
    this.imageBounds = [[24.6873, -24.4149 ], [71.69171, 53.00962]];
    this.histMapON = true;
    this.mymap = L.map('mapid').setView([51.16, 10.45], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);

    // subscribe to the service data
    this.dateService.currentYear.subscribe(selectedYear => this.selectedYear = selectedYear);
    this.dateService.currentImage.subscribe(mapImage => this.mapImage  = mapImage);

    this.translationService.selectedLocations.subscribe(locationsList => {
      this.locationsList = locationsList;
      this.addMapMarkers();
    });
  }

  addMapMarkers() {
    console.log(this.selectedYear);
    console.log(this.mapImage);
    this.markers.clearLayers();

    if (this.locationsList.length > 0) {
      for (let locationEntry of this.locationsList) {
        let marker = L.marker([locationEntry.lattitude, locationEntry.longitude]);
        this.markers.addLayer(marker);
      }
      this.mymap.addLayer(this.markers);
    }
    if(this.histMapON === true){
      this.addMap();
    }
  }

  historicalMapTrigger() {
    if (this.mymap.hasLayer(this.overlays)) {
      this.mymap.removeLayer(this.overlays);
    } else {
      this.addMap();
    }
  }

  addMap() {
    if (this.mymap.hasLayer(this.overlays)) {
      this.mymap.removeLayer(this.overlays);
    }
      this.overlays =  new L.LayerGroup();
      L.imageOverlay(this.mapImage, this.imageBounds).addTo(this.overlays);
      this.mymap.addLayer(this.overlays);
  }

}
