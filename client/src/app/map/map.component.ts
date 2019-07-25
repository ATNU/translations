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
  iconSize: number[];

  constructor(
    private dateService: DateService,
    private translationService: TranslationDataService
  )  { }

  ngOnInit() {
    this.markers = L.markerClusterGroup();
  // this.overlays =  new L.LayerGroup();
    this.imageBounds = [[24.6873, -24.4149 ], [71.69171, 53.00962]];
    this.histMapON = true;
    this.mymap = L.map('mapid').setView([55, 12], 4);
    this.iconSize = [25, 25];

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

    const evidenceIcon = L.icon({
      iconUrl: '../assets/mapicons/lettericons/E.png',
      iconSize: this.iconSize
  });
  const translationIcon = L.icon({
    iconUrl: '../assets/mapicons/lettericons/T.png',
    iconSize: this.iconSize
});
const adaptationIcon = L.icon({
  iconUrl: '../assets/mapicons/lettericons/A.png',
  iconSize: this.iconSize
});
const mentionIcon = L.icon({
  iconUrl: '../assets/mapicons/lettericons/M.png',
  iconSize: this.iconSize
});
const originalIcon = L.icon({
  iconUrl: '../assets/mapicons/lettericons/O.png',
  iconSize: this.iconSize
});

const reviewIcon = L.icon({
  iconUrl: '../assets/mapicons/lettericons/R.png',
  iconSize: this.iconSize
});

    this.markers.clearLayers();

    if (this.locationsList.length > 0) {
      for (let locationEntry of this.locationsList) {
        let marker = L.marker;
        // console.log(locationEntry); aaaa
        console.log(locationEntry.type);
        if (locationEntry.type === 'Translation') {
          marker = L.marker([locationEntry.lattitude, locationEntry.longitude], {icon : translationIcon  });
        } else if (locationEntry.type === 'Mention') {
          marker = L.marker([locationEntry.lattitude, locationEntry.longitude], {icon : mentionIcon  });
        } else if (locationEntry.type === 'Reviews and articles') {
          marker = L.marker([locationEntry.lattitude, locationEntry.longitude], {icon : reviewIcon  });
        } else if (locationEntry.type === 'Adaptation') {
          marker = L.marker([locationEntry.lattitude, locationEntry.longitude], {icon : adaptationIcon  });
        } else if (locationEntry.type === 'Original text') {
          marker = L.marker([locationEntry.lattitude, locationEntry.longitude], {icon : originalIcon  });
        } else if (locationEntry.type === 'Evidence of reading') {
          marker = L.marker([locationEntry.lattitude, locationEntry.longitude], {icon : evidenceIcon  });
        } else {
          marker = L.marker([locationEntry.lattitude, locationEntry.longitude]);
        }

        this.markers.addLayer(marker);
      }
      this.mymap.addLayer(this.markers);
    }
    if (this.histMapON === true) {
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
      console.log('here is the map');
      this.mymap.addLayer(this.overlays);
  }

}
