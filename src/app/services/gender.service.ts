import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Gender } from '../model/gender-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient, 
              private authService: AuthService) {
  }

  public getGenders(): Promise<any> {
    return this._getGenders().toPromise()
      .then((data) => {

        let arrGender = new Array<Gender>();

        if (data != null) {

          data.forEach((element: any) => {
            let gender = new Gender();
            Object.assign(gender, element);
            arrGender.push(gender);
          });
          return arrGender;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };

  private _getGenders() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    return this.http.get(`${environment.WebServiceURL}/Gender/GetOnlyActives`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };
}
