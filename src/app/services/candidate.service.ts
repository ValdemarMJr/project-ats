import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CandidateAcademicEducation } from '../model/candidate-academic-education-dto';
import { Candidate } from '../model/candidate-dto';
import { CandidateExperience } from '../model/candidate-experience-dto';
import { CandidateImprovementCourse } from '../model/candidate-improvement-course-dto';
import { CandidatePersonalReference } from '../model/candidate-personal-reference-dto';
import { CandidateRole } from '../model/candidate-role-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getCandidate(): Promise<any> {
    return this._getCandidate().toPromise()
      .then((data) => {

        let candidate = new Candidate();

        if (data != null) {
            Object.assign(candidate, data);
          return candidate;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };
  public getCandidateAcademicEducation(): Promise<any> {
    return this._getCandidateAcademicEducation().toPromise()
      .then((data) => {

        let arrCandidateAcademicEducation = new Array<CandidateAcademicEducation>();

        if (data != null) {

          data.forEach((element: any) => {
            let academicEducation = new CandidateAcademicEducation();
            Object.assign(academicEducation, element);
            arrCandidateAcademicEducation.push(academicEducation);
          });
          return arrCandidateAcademicEducation;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };
  public getCandidateExperiences(): Promise<any> {
    return this._getCandidateExperiences().toPromise()
      .then((data) => {

        let arrCandidateExperiences = new Array<CandidateExperience>();

        if (data != null) {

          data.forEach((element: any) => {
            let experience = new CandidateExperience();
            Object.assign(experience, element);
            arrCandidateExperiences.push(experience);
          });
          return arrCandidateExperiences;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };
  public getCandidateImprovmentCourse(): Promise<any> {
    return this._getCandidateImprovmentCourse().toPromise()
      .then((data) => {

        let arrImprovementCourse = new Array<CandidateImprovementCourse>();

        if (data != null) {

          data.forEach((element: any) => {
            let improvementCourse = new CandidateImprovementCourse();
            Object.assign(improvementCourse, element);
            arrImprovementCourse.push(improvementCourse);
          });
          return arrImprovementCourse;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };
  public getCandidatePersonalReference(): Promise<any> {
    return this._getCandidatePersonalReference().toPromise()
      .then((data) => {

        let arrPersonalReference = new Array<CandidatePersonalReference>();

        if (data != null) {

          data.forEach((element: any) => {
            let personalReference = new CandidatePersonalReference();
            Object.assign(personalReference, element);
            arrPersonalReference.push(personalReference);
          });
          return arrPersonalReference;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };
  public getCandidateRoles(): Promise<any> {
    return this._getCandidateRoles().toPromise()
      .then((data) => {

        let arrRoles = new Array<CandidateRole>();

        if (data != null) {

          data.forEach((element: any) => {
            let role = new CandidateRole();
            Object.assign(role, element);
            arrRoles.push(role);
          });
          return arrRoles;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };


  public save(candidate: Candidate){
  
    const reqheaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
      })

      return this.http.post<number>(`${environment.WebServiceURL}/Candidate/Save`, candidate, {headers : reqheaders})
      .pipe(map(candidateID => {
        return candidateID;
      }));
 
  }
  public saveAcademicEducation(candidateAcademicEducation: CandidateAcademicEducation){
  
    const reqheaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
      })

      return this.http.post<number>(`${environment.WebServiceURL}/Candidate/SaveCandidateAcademicEducation`, candidateAcademicEducation, {headers : reqheaders})
      .pipe(map(candidateID => {
        return candidateID;
      }));
 
  }
  public saveCandidateExperiences(candidateExperience: CandidateExperience){
  
    const reqheaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
      })

      return this.http.post<number>(`${environment.WebServiceURL}/Candidate/SaveCandidateExperiences`, candidateExperience, {headers : reqheaders})
      .pipe(map(candidateID => {
        return candidateID;
      }));
 
  }
  public saveCandidateImprovmentCourse(candidateImprovementCourse: CandidateImprovementCourse){
  
    const reqheaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
      })

      return this.http.post<number>(`${environment.WebServiceURL}/Candidate/SaveCandidateImprovmentCourse`, candidateImprovementCourse, {headers : reqheaders})
      .pipe(map(candidateID => {
        return candidateID;
      }));
 
  }
  public saveCandidatePersonalReferences(candidatePersonalReference: CandidatePersonalReference){
  
    const reqheaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
      })

      return this.http.post<number>(`${environment.WebServiceURL}/Candidate/SaveCandidatePersonalReferences`, candidatePersonalReference, {headers : reqheaders})
      .pipe(map(candidateID => {
        return candidateID;
      }));
 
  }
  public saveCandidateRoles(candidateRole: CandidateRole){
  
    const reqheaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
      })

      return this.http.post<number>(`${environment.WebServiceURL}/Candidate/SaveCandidateRoles`, candidateRole, {headers : reqheaders})
      .pipe(map(candidateID => {
        return candidateID;
      }));
 
  }


  private _getCandidate() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    return this.http.get(`${environment.WebServiceURL}/Candidate`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };
  private _getCandidateAcademicEducation() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    return this.http.get(`${environment.WebServiceURL}/Candidate/GetAcademicEducation`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };
  private _getCandidateExperiences() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    return this.http.get(`${environment.WebServiceURL}/Candidate/GetExperiences`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };
  private _getCandidateImprovmentCourse() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    return this.http.get(`${environment.WebServiceURL}/Candidate/GetImprovmentCourses`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };
  private _getCandidatePersonalReference() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    return this.http.get(`${environment.WebServiceURL}/Candidate/GetPersonalReferences`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };
  private _getCandidateRoles(){
    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    return this.http.get(`${environment.WebServiceURL}/Candidate/GetRoles`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  }
}