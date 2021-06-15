import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ContactType } from '../model/contact-type-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactTypeService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getContactTypes(){
    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    return this.http.get<Array<ContactType>>(`${environment.WebServiceURL}/api/ContactType/GetOnlyActives`, { headers: reqheaders }).pipe(
     map(data => {
        return data;
      })
    );
  }
}
