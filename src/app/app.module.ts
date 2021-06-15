
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { MatTableModule } from '@angular/material/table';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { PainelComponent } from './components/painel/painel.component';
import { JobOpportunitiesComponent } from './components/job-opportunities/job-opportunities.component';
import { HttpClientModule } from '@angular/common/http';
import { UserConfigurationComponent } from './components/user-configuration/user-configuration.component';
import { CandidateComponent } from './components/candidate/candidate.component';

import { ModalConfirmationComponent } from './components/modals/modal-confirmation/modal-confirmation.component';
import { ModalAcademicEducationComponent } from './components/modals/modal-academic-education/modal-academic-education.component';
import { ModalImprovmentCourseComponent } from './components/modals/modal-improvment-course/modal-improvment-course.component';
import { ModalExperiencesComponent } from './components/modals/modal-experiences/modal-experiences.component';
import { ModalPersonalReferencesComponent } from './components/modals/modal-personal-references/modal-personal-references.component';
import { ModalRolesComponent } from './components/modals/modal-roles/modal-roles.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PainelComponent,
    JobOpportunitiesComponent,
    UserConfigurationComponent,
    CandidateComponent,
    ModalConfirmationComponent,
    ModalAcademicEducationComponent,
    ModalImprovmentCourseComponent,
    ModalExperiencesComponent,
    ModalPersonalReferencesComponent,
    ModalRolesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    MatDialogModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
              {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
