import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LocationModel } from "../models/location.model";

@Injectable({
  providedIn: 'root'
})
export class TranslationDataService {

  //build this to be of type translation model for the translation component to view
  private translationsSource = new BehaviorSubject<number>(1929);
  selectedTranslations = this.translationsSource.asObservable();

  // observable for list of locations to pass to front end at map 
  private locationsSource = new BehaviorSubject<Array<LocationModel>>([]);
  selectedLocations = this.locationsSource.asObservable();

  // temp list of locations, this will be popluated from DB with all known location co-ords
  allLocationCoOrds: LocationModel[];

  // to build the list 
  coOrdListforYear: LocationModel[];

  returnedData: any;

  constructor( private http: HttpClient ) { 

    
    this.allLocationCoOrds = [
      {
        location: 'Paris',
        lattitude: 48.8566969, 
        longitude: 2.3514616
      },
      {
        location: 'Amsterdam',
        lattitude: 52.3727598, 
        longitude: 4.8936041
      }
    ]
  }

  getTranslationData(selectedYear: number){
    //use the year to pull the translation data from server

    console.log('calling getTranslationData');
    //currently test data
    //get translation data from server
    //loop through that data and call getLocationCoOrds for each entry
    if(selectedYear == 1789){
      this.getLocationCoOrdinates('Paris');
    } else if(selectedYear == 1929){
      this.getLocationCoOrdinates('Amsterdam');
    } else {
      this.getLocationCoOrdinates('London');
    }

    //once tjhe co ordinates for all locations in translation data have been fetched, then pass them to the observable
    this.locationsSource.next(this.coOrdListforYear);

  }



  getLocationCoOrdinates(locationName: string){
    console.log('calling get location coordingates' + locationName);
    //compare the string passed in to the list, if matches then pass lat and long to front end
    let placeFound = false;
    for(let place of this.allLocationCoOrds){
      if (locationName == place.location){
      // place has co ordinates listed, add those co ords to map list
      placeFound = true;
      console.log('its in the list' + place.lattitude);
      this.coOrdListforYear.push(
        {
          location: place.location,
          lattitude: place.lattitude, 
          longitude: place.longitude
        }
      )
      }
    }

    if(placeFound == false){
       //get the coordinated from locationIQ
      this.http.get('https://eu1.locationiq.com/v1/search.php?key=pk.46aa96826f71964d9322b1961e3dcbab&q=“London”&format=json', {observe:'response'}).subscribe( res => { 
        console.log(res) ;
        let response = res.body;
        console.log('test returned');
        console.log(res.body);
        this.returnedData = response[0];
        console.log('list item 1');
        console.log(locationName);
        console.log(this.returnedData.lat);
        console.log(this.returnedData.lon);
        })
        this.coOrdListforYear.push(
          {
            location: locationName,
            lattitude: this.returnedData.lat, 
            longitude: this.returnedData.lon
          }
        )
        //save the new co ordinates to the database
    }

  }

  //pass the co-ordinates into an obervable object for the map component to view
  
}
