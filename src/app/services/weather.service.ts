import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly _HttpClient =inject(HttpClient);

  getForecast():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/forecast`)
  }
  getCityForecast(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/cityForecast/${id}`)
  }
  
}
