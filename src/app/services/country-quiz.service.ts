import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CountriesHttpModel} from '../model/CountriesHttp.model';
import {FullCountryHttpModel} from '../model/FullCountryHttp.model';

@Injectable({providedIn: 'root'})
export class CountryQuizService{

  constructor(private http: HttpClient) {
  }
  getCountries(): Observable<string[]>{
    const url = 'https://restcountries.eu/rest/v2/all';
    return this.http.get<CountriesHttpModel[]>(url).pipe(map(responseData => {
      const countryNamesArr: string[] = [];

      responseData.forEach(item => {
        countryNamesArr.push(item.name);
      });
      return countryNamesArr;
    }));
  }

  getCapitalCityFromCountry(country: string): Observable<FullCountryHttpModel>{
    const url = `https://restcountries.eu/rest/v2/name/${country}`;
    return this.http.get<FullCountryHttpModel[]>(url).pipe(map(responseData => {
      let countryInfo: FullCountryHttpModel = new FullCountryHttpModel();
      countryInfo = {capital : responseData[0].capital, flag  : responseData[0].flag};
      return countryInfo;
    }));
  }

}
