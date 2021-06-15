import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CandidateImprovementCourse } from 'src/app/model/candidate-improvement-course-dto';
import { CourseSituation } from 'src/app/model/course-situation-dto';
import { ImprovementCourse } from 'src/app/model/improvement-course-dto';
import { CandidateService } from 'src/app/services/candidate.service';
import { CourseSituationService } from 'src/app/services/couse-situation.service';
import { ImprovmentCourseService } from 'src/app/services/improvment-couse.service';

@Component({
  selector: 'app-modal-improvment-course',
  templateUrl: './modal-improvment-course.component.html',
  styleUrls: ['./modal-improvment-course.component.css']
})
export class ModalImprovmentCourseComponent implements OnInit {

  cadImprovmentCourse : CandidateImprovementCourse;

  improvmentCourses : Array<ImprovementCourse>;
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
  
  constructor(private improvmentCourseService : ImprovmentCourseService, 
              private situationCourseService : CourseSituationService, private _snackBar: MatSnackBar,
              private router: Router, private candidateService : CandidateService) { 
    this.cadImprovmentCourse = new CandidateImprovementCourse();
    this.cadImprovmentCourse.candidateID = Number(localStorage.getItem("candidateID"));
  }

  ngOnInit() {

    let promises: Promise<any>[] = [this.improvmentCourseService.getImprovmentsCourses(),
      this.situationCourseService.getCourseSituations() ];

    Promise.all(promises).then(data => {
      this.improvmentCourses = data[0];
      this.courseSituations = data[1];

    });
    
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  onSubmit() : void{
    this._snackBar.dismiss();

      this.candidateService.saveCandidateImprovmentCourse(this.cadImprovmentCourse).toPromise().then((data) => {
        this.cadImprovmentCourse.id = data;
      }).catch(error => {
        this.openSnackBar("Ocorreu um erro ao cadastrar!");    
        console.log(error);  
      });
    
  }

}
