import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOpportunities } from 'src/app/model/job-opportunities-dto';
import { AuthService } from 'src/app/services/auth.service';
import { JobOpportunitiesService } from 'src/app/services/job-opportunities.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent implements OnInit {

  variavel: String;
  opportunities: Array<JobOpportunities> = [];

  constructor(private http: HttpClient, private authService: AuthService,  
              private router: Router, public opportunitiesService : JobOpportunitiesService,
              private route: ActivatedRoute) { 
               
              }
  
  ngOnInit() : void{
  
  }

  onLogout() : void {
    this.authService.logout().toPromise().then((data) =>{
      this.router.navigate(['/login']);
    })
  }


} 
