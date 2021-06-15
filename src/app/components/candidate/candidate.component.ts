import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Address } from 'src/app/model/address-dto';
import { Candidate } from 'src/app/model/candidate-dto';
import { City } from 'src/app/model/city-dto';
import { CivilState } from 'src/app/model/civil-state-dto';
import { Gender } from 'src/app/model/gender-dto';
import { Neighborhood } from 'src/app/model/neighborhood-dto';
import { State } from 'src/app/model/stateDTO';
import { CandidateService } from 'src/app/services/candidate.service';
import { CityService } from 'src/app/services/city.service';
import { CivilStateService } from 'src/app/services/civil-state.service';
import { GenderService } from 'src/app/services/gender.service';
import { NeighborhoodService } from 'src/app/services/neighborhood.service';
import { StateService } from 'src/app/services/state-service';


import { AcademicEducationColumns } from 'src/app/model/interfaces/academic-education-columns.interface';
import { ImprovmentCourseColumns } from 'src/app/model/interfaces/improvment-course-columns.interface';
import { ExperiencesColumns } from 'src/app/model/interfaces/experiences-columns.interface';
import { DataSource } from '@angular/cdk/table';
import { CandidaturaColumns } from 'src/app/model/interfaces/candidatura-columns.interface';
import { PersonalReferencesColumns } from 'src/app/model/interfaces/personal-references-columns.interface';
import { ModalAcademicEducationComponent } from '../modals/modal-academic-education/modal-academic-education.component';
import { ModalImprovmentCourseComponent } from '../modals/modal-improvment-course/modal-improvment-course.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidateAcademicEducation } from 'src/app/model/candidate-academic-education-dto';
import { CandidateImprovementCourse } from 'src/app/model/candidate-improvement-course-dto';
import { CandidateExperience } from 'src/app/model/candidate-experience-dto';
import { CandidatePersonalReference } from 'src/app/model/candidate-personal-reference-dto';
import { AcademicEducation } from 'src/app/model/academic-education-dto';
import { CourseSituation } from 'src/app/model/course-situation-dto';
import { ImprovementCourse } from 'src/app/model/improvement-course-dto';
import { PersonalReference } from 'src/app/model/personal-references-dto';
import { PersonalReferenceType } from 'src/app/model/personal-reference-type-dto';
import { ModalExperiencesComponent } from '../modals/modal-experiences/modal-experiences.component';
import { ModalPersonalReferencesComponent } from '../modals/modal-personal-references/modal-personal-references.component';
import { ModalRolesComponent } from '../modals/modal-roles/modal-roles.component';
import { CandidateRole } from 'src/app/model/candidate-role-dto';
import { Role } from 'src/app/model/roleDTO';


var ELEMENT_DATA: AcademicEducationColumns[] = [];
var ELEMENT_DATA_IMPROVMENT_COURSE: ImprovmentCourseColumns[] = [];
var ELEMENT_DATA_EXPERIENCES: ExperiencesColumns[] = [];
var ELEMENT_DATA_PERSONAL_REFERENCES: PersonalReferencesColumns[] = [];
var ELEMENT_DATA_CANDIDATURA: CandidaturaColumns[] = [];

export class DataSourceAcademicEducation extends DataSource<AcademicEducationColumns> {

  data = new BehaviorSubject<AcademicEducationColumns[]>(ELEMENT_DATA);

  connect(): Observable<AcademicEducationColumns[]> {
    return this.data;
  }

  disconnect() {}
}
export class DataSourceExperiences extends DataSource<ExperiencesColumns> {

  data = new BehaviorSubject<ExperiencesColumns[]>(ELEMENT_DATA_EXPERIENCES);

  connect(): Observable<ExperiencesColumns[]> {
    return this.data.asObservable();
  }

  disconnect() {}
}
export class DataSourceImprovmentCourse extends DataSource<ImprovmentCourseColumns> {

  data = new BehaviorSubject<ImprovmentCourseColumns[]>(ELEMENT_DATA_IMPROVMENT_COURSE);

  connect(): Observable<ImprovmentCourseColumns[]> {
    return this.data.asObservable();
  }

  disconnect() {}
}
export class DataSourceReferenciasPessoais extends DataSource<PersonalReferencesColumns> {

  data = new BehaviorSubject<PersonalReferencesColumns[]>(ELEMENT_DATA_PERSONAL_REFERENCES);

  connect(): Observable<PersonalReferencesColumns[]> {
    return this.data.asObservable();
  }

  disconnect() {}
}
export class DataSourceCandidatura extends DataSource<CandidaturaColumns> {

  data = new BehaviorSubject<CandidaturaColumns[]>(ELEMENT_DATA_CANDIDATURA);

  connect(): Observable<CandidaturaColumns[]> {
    return this.data.asObservable();
  }

  disconnect() {}
}

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})

export class CandidateComponent implements OnInit {

  candidate: Candidate;
 
  states : Array<State> = [];
  cities : Array<City> = [];
  citiesAddress : Array<City> = [];
  genders : Array<Gender> = [];
  civilStates : Array<CivilState> = [];
  neighborhoods : Array<Neighborhood> = [];


  displayedColumnsAcademicEducation: string[] = ['academicEducation', 'courseSituation', 'dtStart', 'dtFinish'];
  dataSourceAcademicEducation = new DataSourceAcademicEducation();

  displayedColumnsImprovmentCourse: string[] = ['improvmentCourse', 'courseSituation', 'dtStart', 'dtFinish'];
  dataSourceImprovmentCourse = new DataSourceImprovmentCourse();

  displayedColumnsExperiences: string[] = ['company', 'dtStart', 'dtFinish'];
  dataSourceExperiences = new DataSourceExperiences();

  displayedColumnsReferenciasPessoais: string[] = ['name', 'telephone', 'typePersonalReference'];
  dataSourceReferenciasPessoais = new DataSourceReferenciasPessoais();

  displayedColumnsCandidatura: string[] = ['name'];
  dataSourceCandidatura = new DataSourceCandidatura();


  stateBirthControl = new FormControl('', [
    Validators.required
  ]);

  cityBirthControl = new FormControl('', [
    Validators.required
  ]);

  stateAddressControl = new FormControl('', [
    Validators.required
  ]);

  cityAddressControl = new FormControl('', [
    Validators.required
  ]);

  neighborhoodAddressControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public dialog: MatDialog, private genderService : GenderService, private civilStateService : CivilStateService, 
    private stateService : StateService,  private cityService : CityService,  private router: Router, private _snackBar: MatSnackBar,
    private neighborhoodService : NeighborhoodService, private candidateService : CandidateService, private changeDetectorRefs: ChangeDetectorRef) {
      
      this.candidate = new Candidate;

      this.candidate.gender = new Gender;
      this.candidate.genderID = 0;

      this.candidate.civilState = new CivilState;
      this.candidate.civilStateID = 0;

      this.candidate.placeOfBirth = new City;
      this.candidate.placeOfBirthID = 0;

      this.candidate.address = new Address;
      this.candidate.addressID = 0;

      this.candidate.address.neighborhood = new Neighborhood;
      this.candidate.address.neighborhoodID = 0;

      this.candidate.address.neighborhood.city = new City;
      this.candidate.address.neighborhood.cityID = 0;

      this.candidate.address.neighborhood.city.state = new State;
      this.candidate.address.neighborhood.city.stateID = 0;

     }

  ngOnInit(): void {
    let promises: Promise<any>[] = [this.candidateService.getCandidate(),
      this.genderService.getGenders(),
      this.civilStateService.getCivilStates(),
      this.stateService.getStates(),
      this.candidateService.getCandidateAcademicEducation(),
      this.candidateService.getCandidateImprovmentCourse(),
      this.candidateService.getCandidateExperiences(),
      this.candidateService.getCandidatePersonalReference(),
      this.candidateService.getCandidateRoles()
    ];

    Promise.all(promises).then(data => {
      this.candidate = data[0];
      this.genders = data[1];
      this.civilStates = data[2];
      this.states = data[3];
      localStorage.setItem("candidateID", this.candidate.id.toString());

      if(this.candidate.placeOfBirth.id > 0){
        this.stateBirthControl.setValue( this.candidate.placeOfBirth.stateID);
        this.onSelectState();
      }
      
      if(this.candidate.address != null && this.candidate.address.neighborhood.city.stateID > 0){
        this.stateAddressControl.setValue( this.candidate.address.neighborhood.city.stateID);
        this.onSelectStateAddress();
      }

      if(data[4] != null && data[4] != undefined){
        this.updateTableAcademicEducation(data[4]);
      }

      if(data[5] != null && data[5] != undefined){
        this.updateTableImprovmentCourses(data[5]);
      }

      if(data[6] != null && data[6] != undefined){
        this.updateTableExperiences(data[6]);
      }

      if(data[7] != null && data[7] != undefined){
        this.updateTablePersonalReferences(data[7]);
      }

      if(data[8] != null && data[8] != undefined){
        this.updateTableRoles(data[8]);
      }

    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['candidate']) {
      this.candidate = changes['candidate'].currentValue;
    }

  }
  
  onSelectState(){
    if(this.candidate.placeOfBirthID > 0){

      let promises: Promise<any>[] = [this.cityService.getCitiesByState(this.candidate.placeOfBirth.stateID)];

      Promise.all(promises).then(data => {
        this.cities = data[0];
        
        if(this.candidate.placeOfBirthID > 0){
          this.cityBirthControl.setValue(this.candidate.placeOfBirthID);
        }
      });
    }
  }
  onSelectStateAddress(){
    if(this.candidate.address.neighborhood.city.stateID > 0){

      let promises: Promise<any>[] = [this.cityService.getCitiesByState(this.candidate.address.neighborhood.city.stateID)];

      Promise.all(promises).then(data => {
        this.citiesAddress = data[0];
        
        if(this.candidate.address.neighborhood.cityID > 0){
          this.onSelectCityAddress();
        }
      
      });
    }
  }
  onSelectCityAddress(){
    if(this.candidate.address.neighborhood.cityID > 0){

      let promises: Promise<any>[] = [this.neighborhoodService.getNeighborhoodsByCity(this.candidate.address.neighborhood.cityID)];

      Promise.all(promises).then(data => {
        this.neighborhoods = data[0];
        
        if(this.candidate.address.neighborhoodID > 0){
          this.neighborhoodAddressControl.setValue( this.candidate.address.neighborhoodID);   
        }
      });
    }
  }


  updateTables(data: any[]){

    if(data != null && data != undefined){

      this.updateTableAcademicEducation(data[0]);

      if(data[1] != null && data[1] != undefined){
       this.updateTableImprovmentCourses(data[1]);
      }
     
      if(data[2] != null && data[2] != undefined){
        this.updateTableExperiences(data[2])
      }

      if(data[3] != null && data[3] != undefined){
        this.updateTablePersonalReferences(data[3]);
      }

      if(data[4] != null && data[4] != undefined){
        this.updateTableRoles(data[4]);
      }
    }
  }
  updateTableAcademicEducation(data : any[]){

    ELEMENT_DATA = [];

    if(data != null && data != undefined){

      data.forEach((element: any) => {
        let itemAcademic = new CandidateAcademicEducation;
        itemAcademic = new CandidateAcademicEducation;
        itemAcademic.academicEducation = new AcademicEducation;
        itemAcademic.courseSituation = new CourseSituation;
        Object.assign(itemAcademic, element);

        let itemGrid : AcademicEducationColumns;
        itemGrid = new AcademicEducationColumns;
        itemGrid.academicEducation = itemAcademic.academicEducation.name;
        itemGrid.courseSituation = itemAcademic.courseSituation.name;
        itemGrid.dtStart = itemAcademic.dtStart;
        itemGrid.dtFinish = itemAcademic.dtFinish;
        ELEMENT_DATA.push(itemGrid);
      });
    }
  }
  updateTableImprovmentCourses(data :any[]){

    ELEMENT_DATA_IMPROVMENT_COURSE = [];

    if(data != null && data != undefined){
      data.forEach((element: any) => {
        let itemImprovment: CandidateImprovementCourse;
        itemImprovment = new CandidateImprovementCourse;
        itemImprovment.situationCourse = new CourseSituation;
        itemImprovment.improvementCourse = new ImprovementCourse;
        Object.assign(itemImprovment, element);

        let itemGridImprovment : ImprovmentCourseColumns;
        itemGridImprovment = new ImprovmentCourseColumns;
        itemGridImprovment.courseSituation = itemImprovment.situationCourse.name;
        itemGridImprovment.improvmentCourse = itemImprovment.improvementCourse.name;
        ELEMENT_DATA_IMPROVMENT_COURSE.push(itemGridImprovment);
      });
    }
  }
  updateTableExperiences(data: any[]){

    ELEMENT_DATA_EXPERIENCES = [];

    if(data != null && data != undefined){
      data.forEach((element: any) => {
        let itemExperience: CandidateExperience;
        itemExperience = new CandidateExperience;
        Object.assign(itemExperience, element);

        let itemGridExperience: ExperiencesColumns;
        itemGridExperience = new ExperiencesColumns;
        itemGridExperience.company = itemExperience.company;
        itemGridExperience.dtStart = itemExperience.dtAdmission;
        itemGridExperience.dtFinish = itemExperience.dtResignation;
        ELEMENT_DATA_EXPERIENCES.push(itemGridExperience);
      });
    }
  }
  updateTablePersonalReferences(data: any[]){

    ELEMENT_DATA_PERSONAL_REFERENCES = [];

    if(data != null && data != undefined){
      if(data != null && data != undefined){
        data.forEach((element: any) => {
          let itemReference: CandidatePersonalReference;
          itemReference = new CandidatePersonalReference;
          itemReference.personalReference = new PersonalReference;
          itemReference.personalReference.personalReferenceType = new PersonalReferenceType;
          Object.assign(itemReference, element);

          let itemReferenceGrid: PersonalReferencesColumns;
          itemReferenceGrid = new PersonalReferencesColumns;
          itemReferenceGrid.name = itemReference.personalReference.name;
          itemReferenceGrid.telephone = itemReference.personalReference.telephone;
          itemReferenceGrid.typePersonalReference = itemReference.personalReference.personalReferenceType.name;
          ELEMENT_DATA_PERSONAL_REFERENCES.push(itemReferenceGrid);
        });
      }
    }
  }
  updateTableRoles(data: any[]){

    ELEMENT_DATA_CANDIDATURA = [];

    if(data != null && data != undefined){
      data.forEach((element: any) => {
        let itemRole: CandidateRole;
        itemRole = new CandidateRole;
        itemRole.role = new Role;
        Object.assign(itemRole, element);

        let itemRoleGrid: CandidaturaColumns;
        itemRoleGrid = new CandidaturaColumns;
        itemRoleGrid.name = itemRole.role.name;
        ELEMENT_DATA_CANDIDATURA.push(itemRoleGrid);
      });
    }
  }

  insertAcademicEducationClick(){
    let dialogRef = this.dialog.open(ModalAcademicEducationComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        
        let promises: Promise<any>[] = [this.candidateService.getCandidateAcademicEducation()];
    
        Promise.all(promises).then(data => {
          this.candidate.academicsEducation = data[0];
          this.updateTableAcademicEducation(data[0]);
        })
      }
    });
  }
  insertImprovmentCourseClick(){
    let dialogRef = this.dialog.open(ModalImprovmentCourseComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        
        let promises: Promise<any>[] = [this.candidateService.getCandidateImprovmentCourse()];
    
        Promise.all(promises).then(data => {
          this.candidate.improvementCourses = data[0];
          this.updateTableImprovmentCourses(data[0]);
        })

      }
    });
  }
  insertExperiencesClick(){
    let dialogRef = this.dialog.open(ModalExperiencesComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        
        let promises: Promise<any>[] = [this.candidateService.getCandidateExperiences()];
    
        Promise.all(promises).then(data => {
          this.candidate.experiences = data[0];
          this.updateTableExperiences(data[0]);
        })
      }
    });
  }
  insertPersonalReferencesClick(){
    let dialogRef = this.dialog.open(ModalPersonalReferencesComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        
        let promises: Promise<any>[] = [this.candidateService.getCandidatePersonalReference()];
    
        Promise.all(promises).then(data => {
          this.candidate.personalReferences = data[0];
          this.updateTablePersonalReferences(data[0]);
        })
      }
    });
  }
  insertRolesClick(){
    let dialogRef = this.dialog.open(ModalRolesComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        
        let promises: Promise<any>[] = [this.candidateService.getCandidateRoles()];
    
        Promise.all(promises).then(data => {
          this.candidate.roles = data[0];
          this.updateTableRoles(data[0]);
        })
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
  onSubmit() : void{
    this._snackBar.dismiss();

      this.candidateService.save(this.candidate).toPromise().then((data) => {
        this.candidate.id = data;
        this.openSnackBar("Currículo cadastrado com sucesso!"); 
      }).catch(error => {
        this.openSnackBar("Ocorreu um erro ao cadastrar!");    
        console.log(error);  
      });  
  }

}
