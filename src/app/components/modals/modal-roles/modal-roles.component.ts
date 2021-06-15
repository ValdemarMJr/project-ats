import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CandidateRole } from 'src/app/model/candidate-role-dto';
import { Role } from 'src/app/model/roleDTO';
import { CandidateService } from 'src/app/services/candidate.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-modal-roles',
  templateUrl: './modal-roles.component.html',
  styleUrls: ['./modal-roles.component.css']
})
export class ModalRolesComponent implements OnInit {

  cadRole: CandidateRole;
  roles: Array<Role>;
   
  selectRoleControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private candidateService : CandidateService, private roleService : RoleService,
              private router: Router, private _snackBar: MatSnackBar) {
                this.cadRole = new CandidateRole();
                this.cadRole.candidateID = Number(localStorage.getItem("candidateID"));
              }

  ngOnInit() {
    let promises: Promise<any>[] = [ this.roleService.getRoles() ];

    Promise.all(promises).then(data => {
      this.roles = data[0];
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  onSubmit() : void{
    this._snackBar.dismiss();

      this.candidateService.saveCandidateRoles(this.cadRole).toPromise().then((data) => {
        this.cadRole.id = data;
      }).catch(error => {
        this.openSnackBar("Ocorreu um erro ao cadastrar!");    
        console.log(error);  
      });
    
  }

}
