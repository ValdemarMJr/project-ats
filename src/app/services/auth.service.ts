import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Candidate } from '../model/candidate-dto';
import { TokenDTO } from '../model/token-dto';
import { User } from '../model/user';
import { UserSiginDTO } from '../model/user-sigin-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userStorage = 'currentUserToken';
  private currentTokenSubject: BehaviorSubject<TokenDTO>;
  public currentToken: Observable<TokenDTO>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<TokenDTO>(JSON.parse(localStorage.getItem(this.userStorage) || '{}'));
    this.currentToken = this.currentTokenSubject.asObservable();
  }
  public get currentUserValue(): TokenDTO {
    return this.currentTokenSubject.value;
  }

  login(user: UserSiginDTO) {
    return this.http.post<TokenDTO>(`${environment.WebServiceURL}/auth/sigin`, user)
      .pipe(map(user => {
        localStorage.setItem(this.userStorage, JSON.stringify(user));
        this.currentTokenSubject.next(user);
        return user;
      }));

    
  }

  logout() {
    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentUserValue.accessToken}`
    })
    return this.http.get(`${environment.WebServiceURL}/auth/revoke`, { headers: reqheaders }).pipe(map(data => {
      localStorage.removeItem(this.userStorage);
      this.currentTokenSubject.next(null);
    }));
  }

  generateTemporaryCredentials(user: UserSiginDTO)
  {
    return this.http.post<TokenDTO>(`${environment.WebServiceURL}/auth/generateTemporaryCredentials`, user)
      .pipe(map(user => {
        localStorage.setItem(this.userStorage, JSON.stringify(user));
        this.currentTokenSubject.next(user);
        return user;
      }));
  }
}
