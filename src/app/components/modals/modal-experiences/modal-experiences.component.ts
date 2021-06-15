import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ViewChild } from '@angular/core';
import { NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CandidateExperience } from 'src/app/model/candidate-experience-dto';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-modal-experiences',
  templateUrl: './modal-experiences.component.html',
  styleUrls: ['./modal-experiences.component.css']
})
export class ModalExperiencesComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  cadExperiences : CandidateExperience;

  companyFormControl = new FormControl('', [
    Validators.required
  ]);

  dtStartControl = new FormControl('', [
    Validators.required
  ]);

  dtFinishControl = new FormControl('', []);

  activitiesFormControl = new FormControl('', [
    Validators.required
  ]);
  
  constructor(private _ngZone: NgZone,  private candidateService : CandidateService,
    private router: Router, private _snackBar: MatSnackBar) { 
      this.cadExperiences = new CandidateExperience();
      this.cadExperiences.candidateID = Number(localStorage.getItem("candidateID"));
    }

  ngOnInit(): void {
   
  }

  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  onSubmit() : void{
    this._snackBar.dismiss();

      this.candidateService.saveCandidateExperiences(this.cadExperiences).toPromise().then((data) => {
        this.cadExperiences.id = data;
      }).catch(error => {
        this.openSnackBar("Ocorreu um erro ao cadastrar!");    
        console.log(error);  
      });
    
  }

}
