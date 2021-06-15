import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './components/candidate/candidate.component';
import { JobOpportunitiesComponent } from './components/job-opportunities/job-opportunities.component';

import { LoginComponent } from './components/login/login.component';
import { PainelComponent } from './components/painel/painel.component';
import { RegisterComponent } from './components/register/register.component';
import { UserConfigurationComponent } from './components/user-configuration/user-configuration.component';

import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'login/register', component: RegisterComponent },
  {
    path: 'painel',
    component: PainelComponent,
    resolve: {},
    children: [
      { 
        path: 'jobOpportunities', 
        component: JobOpportunitiesComponent,
        resolve: { }, 
        data: {
          title: 'Oportunidades'
        }
      },
      { 
        path: 'configuration', 
        component: UserConfigurationComponent,
        resolve: {}, 
        data: {
          title: 'Configuração'
        }
      },
      { 
        path: 'candidate', 
        component: CandidateComponent,
        resolve: {}, 
        data: {
          title: 'Currículo'
        }
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }