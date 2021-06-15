import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AcademicEducation } from 'src/app/model/academic-education-dto';
import { CandidateAcademicEducation } from 'src/app/model/candidate-academic-education-dto';
import { CourseSituation } from 'src/app/model/course-situation-dto';
import { AcademicEducationService } from 'src/app/services/academic-education.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { CourseSituationService } from 'src/app/services/couse-situation.service';

@Component({
  selector: 'app-modal-academic-education',
  templateUrl: './modal-academic-education.component.html',
  styleUrls: ['./modal-academic-education.component.css']
})

export class ModalAcademicEducationComponent  {

  cadAcademicEducation : CandidateAcademicEducation;
  academicsEducations : Array<AcademicEducation>;
  courseSituations : Array<CourseSituation>;


  selectCourseControl = new FormControl('', [
    Validators.required
  ]);

  selectSituationControl = new FormControl('', [
    Validators.required
  ]);

  dtStartControl = new FormControl('', [
    Validators.required
  ]);

  dtFinishControl = new FormControl('', [
    Validators.required
  ]);
  
  constructor(private academicEducationService : AcademicEducationService, 
              private situationCourseService : CourseSituationService,
              private candidateService : CandidateService,
              private router: Router, private _snackBar: MatSnackBar) { 
    this.cadAcademicEducation = new CandidateAcademicEducation();
    this.cadAcademicEducation.candidateID = Number(localStorage.getItem("candidateID"));
  }

  ngOnInit() {

    let promises: Promise<any>[] = [this.academicEducationService.getAcademicsEducation(),
      this.situationCourseService.getCourseSituations() ];

    Promise.all(promises).then(data => {
      this.academicsEducations = data[0];
      this.courseSituations = data[1];

    });
    
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  onSubmit() : void{
    this._snackBar.dismiss();

      this.candidateService.saveAcademicEducation(this.cadAcademicEducation).toPromise().then((data) => {
        this.cadAcademicEducation.id = data;
      }).catch(error => {
        this.openSnackBar("Ocorreu um erro ao cadastrar!");    
        console.log(error);  
      });
    
  }

}
