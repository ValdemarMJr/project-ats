import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CivilState } from '../model/civil-state-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CivilStateService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getCivilStates(): Promise<any> {
    return this._getCivilStates().toPromise()
      .then((data) => {
        
        let arrCivilState = new Array<CivilState>();

        if (data != null) {

          data.forEach((element: any) => {
            let civilState = new CivilState();
            Object.assign(civilState, element);
            arrCivilState.push(civilState);
          });
          return arrCivilState;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };

  private _getCivilStates() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    return this.http.get(`${environment.WebServiceURL}/CivilState/GetOnlyActives`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };
}
