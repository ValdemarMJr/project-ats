import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Role } from '../model/roleDTO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getRoles(): Promise<any> {
    return this._getRoles().toPromise()
      .then((data) => {

        let arrRoles = new Array<Role>();

        if (data != null) {

          data.forEach((element: any) => {
            let role = new Role();
            Object.assign(role, element);
            arrRoles.push(role);
          });
          return arrRoles;
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  };

  private _getRoles() {

    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })

    return this.http.get(`${environment.WebServiceURL}/Role/GetOnlyActives`, { headers: reqheaders }).pipe(catchError(e => of(e)));
  };

}
