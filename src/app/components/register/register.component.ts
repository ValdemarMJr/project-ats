import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() user : User;

  cpfControl = new FormControl('', [
    Validators.required
  ]);

  completeNameControl = new FormControl('', [
    Validators.required
  ]);

  userNameControl = new FormControl('', [
    Validators.required
  ]);

  emailControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  passwordControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private authService : AuthService,
    private userService : UserService,
    private _snackBar: MatSnackBar) { 
      this.user = new User;
    }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  ngOnInit(): void {
  }

  validate() : boolean{

    var cpfRegistered : boolean;
    cpfRegistered = this.userService.cpfRegistered(this.cpfControl.value);
    if(cpfRegistered){
      this.openSnackBar("Já existe um usuário cadastrado com este CPF!");
      this.cpfControl.setErrors({ invalid: true });
      return false;
    }
    else{
      var userNameRegistered = this.userService.userNameRegistered(this.userNameControl.value);
      if(userNameRegistered){
        this.openSnackBar("Usuário já cadastrado!");
        this.userNameControl.setErrors({ invalid: true });
        return false;
      }
      else{
        var emailRegistered = this.userService.emailRegistered(this.emailControl.value);
        if(emailRegistered){
          this.openSnackBar("Já existe um usuário cadastrado com este Email!");
          this.emailControl.setErrors({ invalid: true });
          return false;
        }
      }
    }
    return true;
  }
  onSubmit() : void{
    this._snackBar.dismiss();

    if(this.validate()){
      this.userService.save(this.user).toPromise().then((data) => {
        this.openSnackBar("Usuário cadastrado com sucesso!");  
        this.router.navigate(['/login']);
      }).catch(error => {
        this.openSnackBar("Ocorreu um erro ao cadastrar!");    
        console.log(error);  
      });
    }
  }
}
