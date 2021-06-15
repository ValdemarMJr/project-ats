import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidateExperience } from 'src/app/model/candidate-experience-dto';
import { CandidatePersonalReference } from 'src/app/model/candidate-personal-reference-dto';
import { PersonalReferenceType } from 'src/app/model/personal-reference-type-dto';
import { PersonalReference } from 'src/app/model/personal-references-dto';
import { CandidateService } from 'src/app/services/candidate.service';
import { PersonalReferenceTypeService } from 'src/app/services/personal-reference-type.service';

@Component({
  selector: 'app-modal-personal-references',
  templateUrl: './modal-personal-references.component.html',
  styleUrls: ['./modal-personal-references.component.css']
})
export class ModalPersonalReferencesComponent implements OnInit {

  cadPersonalReference : CandidatePersonalReference;
  personalReferencesTypes : Array<PersonalReferenceType>;

  
  selectTypeReferenceControl = new FormControl('', [
    Validators.required
  ]);

  nameControl = new FormControl('', [
    Validators.required
  ]);

  telephoneControl = new FormControl('', [
    Validators.required
  ]);
  
  constructor(private _ngZone: NgZone,  private candidateService : CandidateService,
    private _snackBar: MatSnackBar, private personalReferenceTypeService : PersonalReferenceTypeService) {
      this.cadPersonalReference = new CandidatePersonalReference();
      this.cadPersonalReference.personalReference = new PersonalReference;
      this.cadPersonalReference.candidateID = Number(localStorage.getItem("candidateID"));
    }

  ngOnInit(): void {

    let promises: Promise<any>[] = [this.personalReferenceTypeService.getPersonalReferenceTypes()];

    Promise.all(promises).then(data => {
      this.personalReferencesTypes = data[0];
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  onSubmit() : void{
    this._snackBar.dismiss();

      this.candidateService.saveCandidatePersonalReferences(this.cadPersonalReference).toPromise().then((data) => {
        this.cadPersonalReference.id = data;
      }).catch(error => {
        this.openSnackBar("Ocorreu um erro ao cadastrar!");    
        console.log(error);  
      });
    
  }

}
