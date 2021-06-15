import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalConfirmationComponent } from '../modals/modal-confirmation/modal-confirmation.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.css']
})
export class UserConfigurationComponent implements OnInit {

  user : User;
  
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

  constructor(public dialog: MatDialog, private userService : UserService, private router: Router, private _snackBar: MatSnackBar) { 
    this.user = new User();
  }

  ngOnInit(): void {
    let promises: Promise<any>[] = [this.userService.getUser() ];

    Promise.all(promises).then(data => {
      this.user = data[0];

    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
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
        this.openSnackBar("Usuário alterado com sucesso!");  
        this.router.navigate(['/painel/jobOpportunities']);
      }).catch(error => {
        this.openSnackBar("Ocorreu um erro ao alterar!" + error);    
        console.log(error);  
      });
    }
  }

  openDialogConfirmation() {
    let dialogRef = this.dialog.open(ModalConfirmationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        
        let promises: Promise<any>[] = [this.userService.removeUser() ];

        Promise.all(promises).then(data => {
          
          if(data[0] != null && data[0] == true){
            this.router.navigate(['/login']);
          }
    
        });

      }
    });
  }

}
