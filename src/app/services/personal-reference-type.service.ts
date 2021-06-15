import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PersonalReferenceType } from '../model/personal-reference-type-dto';
import { PersonalReference } from '../model/personal-references-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalReferenceTypeService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getPersonalReferenceTypes(): Promise<any> {
    return this._getPersonalReferenceTypes().toPromise()
      .then((data) => {

        let arrTypes = new Array<PersonalReferenceType>();

        if (data != null) {

          data.forEach((element: any) => {
            let type = new PersonalReferenceType();
            Object.assign(type, element);
            arrTypes.push(type);
          });
          return arrTypes;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };

  private _getPersonalReferenceTypes() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })

    return this.http.get(`${environment.WebServiceURL}/PersonalReferenceTypes/GetOnlyActives`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };
}
