import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSiginDTO } from 'src/app/model/user-sigin-dto';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private authService: AuthService, 
    private route: ActivatedRoute, 
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  onSubmit() : void{
    this._snackBar.dismiss();
    let user = new UserSiginDTO()
    user.UserName = this.userFormControl.value;
    user.Password = this.passwordFormControl.value;
    this.authService.login(user).toPromise().then((data) => {
      this.router.navigate(['/painel/jobOpportunities']);
    }).catch(error => {
      if (error.status == 401) { 
        this.openSnackBar("Usuário ou senha inválidos!!");       
        this.passwordFormControl.setErrors({ invalid: true });
      }

    });
  }

}
