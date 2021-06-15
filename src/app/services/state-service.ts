import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { State } from '../model/stateDTO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getStates(): Promise<any> {
    return this._getStates().toPromise()
      .then((data) => {

        let arrState = new Array<State>();

        if (data != null) {

          data.forEach((element: any) => {
            let state = new State();
            Object.assign(state, element);
            arrState.push(state);
          });
          return arrState;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };

  private _getStates() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    return this.http.get(`${environment.WebServiceURL}/State/GetOnlyActives`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };
}
