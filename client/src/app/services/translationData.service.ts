import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LocationModel } from "../models/location.model";
import { TranslationModel } from "../models/translation.model";

@Injectable({
  providedIn: 'root'
})
export class TranslationDataService {

  //build this to be of type translation model for the translation component to view
  private translationsSource = new BehaviorSubject<Array<TranslationModel>>([]);
  selectedTranslations = this.translationsSource.asObservable();

  // observable for list of locations to pass to front end at map 
  private locationsSource = new BehaviorSubject<Array<LocationModel>>([]);
  selectedLocations = this.locationsSource.asObservable();

  // temp list of locations
  allLocationCoOrds: any;
  
  //temp list of translationData
  translationDataResponse: any;

  // to build the list 
  locationIQReturnedData: any;
  coOrdListforYear: LocationModel[];
  translationsListforYear: TranslationModel[];


  constructor( private http: HttpClient ) { 

    this.http.get('http://localhost:3000/cities', {observe:'response'}).subscribe( res => { 
    console.log(res);
        this.allLocationCoOrds = res.body;
        })
    this.coOrdListforYear = [];
    this.translationsListforYear = [];
  }

  getTranslationData(selectedYear: number){
    this.translationsListforYear = [];
    //use the year to pull the translation data from server
    console.log('gettranslationdata');
    this.http.get('http://localhost:3000/texts/'+ selectedYear, {observe:'response'}).subscribe( res => { 
      console.log(res);
      this.translationDataResponse = res.body;

      if(this.translationDataResponse != null){
        this.getLocationCoOrdinates();
      }
    })
     //might need a callback if this doesn't wait

  }



  getLocationCoOrdinates(){
    this.coOrdListforYear = [];
    for(let translationItem of this.translationDataResponse){
      console.log('translation item ')
      console.log(translationItem)
      this.translationsListforYear.push(
        {
          type: translationItem.type,
          year: translationItem.year,
          originalTitle: translationItem.originaltexttitle
        }
      )


      console.log('calling get location coordingates' + translationItem.city);
          
      let placeFound = false;

      //compare the string passed in to the list, if matches then pass lat and long to front end
      for(let locationEntry of this.allLocationCoOrds){
        if (translationItem.city == locationEntry.city){
        // place has co ordinates listed, add those co ords to map list
        placeFound = true;
        console.log('its in the list' + locationEntry.city);
        console.log(locationEntry.city, + locationEntry.latitude + locationEntry.longitude)
        this.coOrdListforYear.push(
          {
            location: locationEntry.city,
            lattitude: locationEntry.latitude, 
            longitude: locationEntry.longitude
          })
        }
      }
     /*   commenting out as it's causing problems, need to work out how to wait until server call is complete before moving on to next item in for loop 
      if(placeFound == false){ //need error handling in here if the co ords can\t be found
        //get the coordinated from locationIQ
         this.http.get('https://eu1.locationiq.com/v1/search.php?key=pk.46aa96826f71964d9322b1961e3dcbab&q=“'+ translationItem.city + '”&format=json', {observe:'response'}).subscribe( res => { 
          let response = res.body;
          console.log('test returned');
          console.log(res.body);
          this.locationIQReturnedData = response[0];
          this.coOrdListforYear.push(
            {
              location: translationItem.city,
              lattitude: this.locationIQReturnedData.lat, 
              longitude: this.locationIQReturnedData.lon
            }
          )
        })
          
        
          //TODO: save the new co ordinates to the database
      }*/

    }
    console.log('co ords list for year');
    console.log(this.coOrdListforYear);
    console.log(this.coOrdListforYear.length);
    console.log(this.translationsListforYear.length);

    this.locationsSource.next(this.coOrdListforYear);
    this.translationsSource.next(this.translationsListforYear);
  }

  //TODO: pass the co-ordinates into an obervable object for the map component to view
  
}
