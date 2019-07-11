import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LocationModel } from '../models/location.model';
import { TranslationModel } from '../models/translation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationDataService {

  // build this to be of type translation model for the translation component to view
  private translationsSource = new BehaviorSubject<Array<TranslationModel>>([]);
  selectedTranslations = this.translationsSource.asObservable();

  // observable for list of locations to pass to front end at map 
  private locationsSource = new BehaviorSubject<Array<LocationModel>>([]);
  selectedLocations = this.locationsSource.asObservable();

    /* shouldnt be needed
    private allTranslationsSource = new BehaviorSubject<Array<TranslationModel>>([]);
    allTranslations = this.allTranslationsSource.asObservable();
*/
  // temp list of locations
  allLocationCoOrds: any;
  citiesToFind: string[];

  // temp list of translationData
  translationDataResponse: any;

  // to build the list
  locationIQReturnedData: any;
  coOrdListforYear: LocationModel[];
  translationsListforYear: TranslationModel[];

  // to build filtered list 
  coOrdListforFilter: LocationModel[];
  translationsListforFilter: TranslationModel[];

 // translationsListAll: TranslationModel[];

  constructor( private http: HttpClient ) {
    this.http.get(environment.apiBaseURL + '/cities', {observe: 'response'}).subscribe( res => { this.allLocationCoOrds = res.body; });
    this.coOrdListforYear = [];
    this.translationsListforYear = [];
    this.citiesToFind = [];
  }

  getAllTranslationData() {
    this.translationsListforYear = [];
    // use the year to pull the translation data from server
    this.http.get(environment.apiBaseURL + '/allTexts/', {observe: 'response'}).subscribe( res => {
      this.translationDataResponse = res.body;
      if (this.translationDataResponse != null) {
        this.getLocationCoOrdinates();
      }

    });
  }

  getTranslationData(selectedYear: number) {
    this.translationsListforYear = [];
    // use the year to pull the translation data from server
    this.http.get(environment.apiBaseURL + '/texts/' + selectedYear, {observe: 'response'}).subscribe( res => {
      this.translationDataResponse = res.body;
      if (this.translationDataResponse != null) {
        console.log('translatopn data response');
        console.log(this.translationDataResponse);
        this.getLocationCoOrdinates();
      }

    });
     // might need a callback if this doesn't wait
  }

  filterTranslationData(filteredDataList: TranslationModel[]) {
    this.translationsListforFilter = filteredDataList;
    this.coOrdListforFilter = [];

    for (let translationItem of this.translationsListforFilter) {
    let placeFound = false;

      // compare the string passed in to the list, if matches then pass lat and long to front end
      for (let locationEntry of this.allLocationCoOrds) {
        if (translationItem.city != null) {
          if (translationItem.city == locationEntry.city){
            // place has co ordinates listed, add those co ords to map list
            placeFound = true;

            this.coOrdListforFilter.push({
              location: locationEntry.city,
              lattitude: locationEntry.latitude,
              longitude: locationEntry.longitude,
              type: translationItem.type
            });
          }

        }
      }
    }

    // only updating co ordinates, not the data list, as the dofilter does that for us
    this.locationsSource.next(this.coOrdListforFilter);
  }

 //  getNewCityCoOrdinates = async () => {
   getNewCityCoOrdinates(){
     console.log('called get new cities');
  //  for (let i = 0; i < 2; i++) {
      if (this.citiesToFind[0]) {
        let city = this.citiesToFind[0];
        this.http.get('https://eu1.locationiq.com/v1/search.php?key=pk.46aa96826f71964d9322b1961e3dcbab&q=“' +
        city + '”&format=json', {observe: 'response'}).subscribe( res => {
          let response = res.body;
          console.log('test returned');
          console.log(res.body);

          let latitude = response[0].lat;
          let longitude = response[0].lon;

          let newCity = {
            latitude,
            longitude,
            city
          };
          console.log('sending to sheet');
          this.http.post(environment.apiBaseURL + '/addLocation/', newCity, {observe: 'response', responseType: 'text'}).subscribe( res => {
            console.log(res.body);
          });

        });
      }
  }

  getLocationCoOrdinates() {
    this.coOrdListforYear = [];
    for (let translationItem of this.translationDataResponse) {

    this.translationsListforYear.push(
      {
        type: translationItem.type,
        originalTitle: translationItem.originaltexttitle,
        originalTextId: translationItem.originaltextid,
        originalAuthor: translationItem.originaltextauthor,
        details: translationItem.translationdetails,
        city: translationItem.city,
        location: translationItem.locationifnocity,
        year: translationItem.year
      }
    );


      let placeFound = false;

      // compare the string passed in to the list, if matches then pass lat and long to front end

        if (translationItem.city != null && translationItem.city !== '') {
          console.log(translationItem.city);

          let cityCoOrds =  this.allLocationCoOrds.find(x => x.city == translationItem.city);

          if (cityCoOrds != null) {
            this.coOrdListforYear.push({
              location: cityCoOrds.city,
              lattitude: cityCoOrds.latitude,
              longitude: cityCoOrds.longitude,
              type: translationItem.type
            });
          } else {
            console.log(translationItem.city + 'no co-ords found');
            this.citiesToFind.push(translationItem.city);

        }
      }

  }
    // put values into observables to be picked up in front end
    this.locationsSource.next(this.coOrdListforYear);
    this.translationsSource.next(this.translationsListforYear);
console.log('cities to fine');
console.log(this.citiesToFind);
  if (this.citiesToFind.length > 0) {
    console.log('get new cities');
    this.getNewCityCoOrdinates();
  }


}


}