import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Neighborhood } from '../model/neighborhood-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

 
  public getNeighborhoodsByCity(cityID: number): Promise<any> {
    return this._getNeighborhoodsByCity(cityID).toPromise()
      .then((data) => {

        let arrNeighborhood = new Array<Neighborhood>();

        if (data != null) {

          data.forEach((element: any) => {
            let neighborhood = new Neighborhood();
            Object.assign(neighborhood, element);
            arrNeighborhood.push(neighborhood);
          });
          return arrNeighborhood;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };

  private _getNeighborhoodsByCity(cityID: number) {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })

    const reqParams = new HttpParams().set("cityID", (cityID ? cityID.toString() : "0")).set("onlyActives", true)

    return this.http.get(`${environment.WebServiceURL}/Neighborhood/GetByCity`, { headers: reqheaders, params :  reqParams }).pipe(catchError(e => of(e)));
  };
}
