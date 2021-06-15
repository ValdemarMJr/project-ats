import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../model/user";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    constructor(private http: HttpClient, private authService: AuthService) {
    }
  
    userNameRegistered(userName : string) : boolean{
      var registered : boolean;

      this.getUserByUserName(userName).pipe(
        map(data => {
          if(data != null && data.id > 0 )
            registered = true;
        })
      );
        
      return registered;
    }

    cpfRegistered(cpf : string) : boolean{
        var registered : boolean;
  
        this.getUserByCPF(cpf).pipe(
            map(data => {
              if(data != null && data.id > 0 )
                registered = true;
            })
          );
        return registered;
    }

    emailRegistered(email : string) : boolean{
        var registered : boolean;
  
        this.getUserByEmail(email).pipe(
            map(data => {
              if(data != null && data.id > 0 )
                registered = true;
            })
          );

        return registered;
    }

    getUserByCPF(cpf : string) {
        const reqheaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
        })
        return this.http.get<User>(`${environment.WebServiceURL}/User/GetByCPF/` + cpf, { headers: reqheaders }).pipe(
          map(data => {
            return data;
          })
        );
    }

    getUserByUserName(userName : string) {
        const reqheaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
        })
        return this.http.get<User>(`${environment.WebServiceURL}/User/GetByUserName/` + userName, { headers: reqheaders }).pipe(
          map(data => {
            return data;
          })
        );
    }

    getUserByEmail(email : string) {
        const reqheaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
        })
        return this.http.get<User>(`${environment.WebServiceURL}/User/GetByEmail/` + email, { headers: reqheaders }).pipe(
          map(data => {
            return data;
          })
        );
    }

    save(user: User){
  
        const reqheaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
          })

          return this.http.post<User>(`${environment.WebServiceURL}/user/save`, user, {headers : reqheaders})
          .pipe(map(user => {
            return user;
          }));
     
    }

    public getUser(): Promise<any> {
      return this._getUser().toPromise()
        .then((data) => {
  
            let user = new User();

            if (data != null) {
              Object.assign(user, data);

            return user;
          }
        })
        .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
    };

    public removeUser(): Promise<any> {
      return this._removeUser().toPromise()
        .then((data) => {
  
            let deleted = Boolean;

            if (data != null) {
              Object.assign(deleted, data);

            return deleted;
          }
        })
        .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
    };
  
    private _getUser() {
  
      const reqheaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
      })
      return this.http.get(`${environment.WebServiceURL}/User`, { headers: reqheaders }).pipe(catchError(e => of(e)));
    };

    private _removeUser() {
  
      const reqheaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
      })
      return this.http.get(`${environment.WebServiceURL}/User/Delete`, { headers: reqheaders }).pipe(catchError(e => of(e)));
    };

  }
  