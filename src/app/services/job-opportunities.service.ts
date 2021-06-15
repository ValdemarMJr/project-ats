import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JobOpportunities } from '../model/job-opportunities-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobOpportunitiesService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getJobOpportunities(): Promise<any> {
    return this._getJobOpportunities().toPromise()
      .then((data) => {

        let arrOpportunities = new Array<JobOpportunities>();

        if (data != null) {

          data.forEach((element: any) => {
            let opportunity = new JobOpportunities();
            Object.assign(opportunity, element);
            arrOpportunities.push(opportunity);
          });
          return arrOpportunities;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };

  private _getJobOpportunities() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    return this.http.get(`${environment.WebServiceURL}/JobOpportunity/GetOnlyActives`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };

}
