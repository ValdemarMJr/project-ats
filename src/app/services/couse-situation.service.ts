import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CourseSituation } from '../model/course-situation-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseSituationService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getCourseSituations(): Promise<any> {
    return this._getCourseSituations().toPromise()
    .then((data) => {

    let arrCourseSituation = new Array<CourseSituation>();

    if (data != null) {

    data.forEach((element: any) => {
      let situation = new CourseSituation();
      Object.assign(situation, element);
      arrCourseSituation.push(situation);
    });
    return arrCourseSituation;
    }
    })
    .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };

  private _getCourseSituations() {

    const reqheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })

    return this.http.get(`${environment.WebServiceURL}/CourseSituation/GetOnlyActives`, { headers: reqheaders }).pipe(catchError(e => of(e)));
    };
  
}
