import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { City } from '../model/city-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getCitiesByState(stateID: number): Promise<any> {
    return this._getCitiesByState(stateID).toPromise()
      .then((data) => {

        let arrCity = new Array<City>();

        if (data != null) {

          data.forEach((element: any) => {
            let city = new City();
            Object.assign(city, element);
            arrCity.push(city);
          });
          return arrCity;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };

  private _getCitiesByState(stateID: number) {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })

    const reqParams = new HttpParams().set("stateID", (stateID ? stateID.toString() : "0")).set("onlyActives", true)

    return this.http.get(`${environment.WebServiceURL}/City/GetByState`, { headers: reqheaders, params :  reqParams }).pipe(catchError(e => of(e)));
  };

}
