import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenDTO } from 'src/app/model/token-dto';
import { User } from 'src/app/model/user';
import { UserSiginDTO } from 'src/app/model/user-sigin-dto';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterResolver implements Resolve<TokenDTO> {
  constructor(private authService:AuthService)
  {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<TokenDTO> {
    var userTemp: UserSiginDTO;
    userTemp.UserName = "temporary";
    return this.authService.generateTemporaryCredentials(userTemp).toPromise();
  }
}
