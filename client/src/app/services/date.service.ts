import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClientModule} from '@angular/common/http';
@Injectable()

export class DateService {

  private pausedSource = new BehaviorSubject<boolean>(false);
  isPaused = this.pausedSource.asObservable();

  private yearSource = new BehaviorSubject<number>(1929);
  currentYear = this.yearSource.asObservable();

  private imageSource = new BehaviorSubject<string>('assets/newmaps/1929_modified.tif');
  currentImage = this.imageSource.asObservable();

  public yearsWithMaps: number[] = [
    1789, 1793, 1795, 1804, 1812, 1820, 1830, 1839, 1848, 1861, 1867, 1871, 1878, 1881, 1885, 1908, 1911, 1913, 1921, 1923, 1929 ];

  public mapTicks: number[] = [1789, 1793, 1798, 1800, 1806, 1810, 1826, 1830, 1832, 1937, 1842, 1848, 1850,
    1855, 1860, 1864, 1870, 1878, 1882, 1887, 1890, 1892, 1900, 1904, 1910, 1913, 1920, 1929];
  public mapLegend: number[] = [1789, 1810, 1830, 1850, 1870, 1890, 1910, 1929];

  constructor( private httpC: HttpClientModule) {
  }

  changeSelectedYear(selectedYear: number) {
    // update the selectedyear and using that update the map image source + data panel
    this.yearSource.next(selectedYear);

    // check if the year exists as an image, cheating, really should be checking the files for existing image
    if (this.yearsWithMaps.includes(selectedYear)) {

      this.imageSource.next('assets/newmaps/' + selectedYear + '_modified.tif');
    } else {
      // use previous year if no map available
      let prevMapFound = false;
      let findLastYearWithMap = selectedYear;

      do {

        findLastYearWithMap--;
        if (this.yearsWithMaps.includes(findLastYearWithMap)) {
          this.imageSource.next('assets/newmaps/' + findLastYearWithMap + '_modified.tif');
          prevMapFound = true;

        }
     } while (prevMapFound == false);

    }
  }

  pauseLoop(pauseClicked: boolean) {
    this.pausedSource.next(pauseClicked);
  }

}
