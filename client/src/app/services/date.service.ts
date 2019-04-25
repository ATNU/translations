import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()

export class DateService {

  private yearSource = new BehaviorSubject<number>(1929);
  currentYear = this.yearSource.asObservable();

  private imageSource = new BehaviorSubject<string>("assets/borders/1929.svg");
  currentImage = this.imageSource.asObservable();

  public existingYears : number[] = [1789, 1793, 1795, 1804, 1812, 1820, 1830, 1839, 1848, 1861, 1867, 1871, 1878, 1881, 1885, 1908, 1911, 1913, 1921, 1923, 1929 ];

  constructor() {
  }

  changeSelectedYear(selectedYear: number){
    //update the selectedyear and using that update the map image source + data panel
    console.log ('service called');
    this.yearSource.next(selectedYear);

    //check if the year exists as an image, cheating, really should be checking the files for existing image
    if (this.existingYears.includes(selectedYear)){
      console.log('image found');
      this.imageSource.next("assets/borders/" + selectedYear + ".svg");
    } else{
      console.log("not in array");
      //here it needs to find the image of the closest year, possibly need to put the whole thing in a loop
      // then -1 from selected year until we find a match?
    
    }
    

  }
}
