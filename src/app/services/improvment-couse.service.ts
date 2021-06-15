import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AcademicEducation } from '../model/academic-education-dto';
import { ImprovementCourse } from '../model/improvement-course-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImprovmentCourseService {

    constructor(private http: HttpClient, 
        private authService: AuthService) {
}

public getImprovmentsCourses(): Promise<any> {
    return this._getImprovmentsCourses().toPromise()
    .then((data) => {

    let arrImprovmentCourse = new Array<ImprovementCourse>();

    if (data != null) {

        data.forEach((element: any) => {
        let course = new ImprovementCourse();
        Object.assign(course, element);
        arrImprovmentCourse.push(course);
        });
        return arrImprovmentCourse;
    }
    })
    .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
};

private _getImprovmentsCourses() {

    const reqheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    
    return this.http.get(`${environment.WebServiceURL}/ImprovementCourses/GetOnlyActives`, { headers: reqheaders }).pipe(catchError(e => of(e)));
    };
}
