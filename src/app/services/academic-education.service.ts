import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AcademicEducation } from '../model/academic-education-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AcademicEducationService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getAcademicsEducation(): Promise<any> {
    return this._getAcademicsEducation().toPromise()
      .then((data) => {

        let arrCourse = new Array<AcademicEducation>();

        if (data != null) {

          data.forEach((element: any) => {
            let course = new AcademicEducation();
            Object.assign(course, element);
            arrCourse.push(course);
          });
          return arrCourse;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };

  private _getAcademicsEducation() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })

    return this.http.get(`${environment.WebServiceURL}/AcademicsEducation/GetOnlyActives`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };

}
