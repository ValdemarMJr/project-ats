import { HttpClient } from '@angular/common/http';
import { AfterViewChecked } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOpportunities } from 'src/app/model/job-opportunities-dto';
import { AuthService } from 'src/app/services/auth.service';
import { JobOpportunitiesService } from 'src/app/services/job-opportunities.service';

@Component({
  selector: 'app-job-opportunities',
  templateUrl: './job-opportunities.component.html',
  styleUrls: ['./job-opportunities.component.css']
})
export class JobOpportunitiesComponent implements OnInit, AfterViewChecked {

  opportunities: Array<JobOpportunities> = [];

  constructor(private http: HttpClient, private authService: AuthService,  
              private router: Router, public opportunitiesService : JobOpportunitiesService,
              private route: ActivatedRoute) { 
             
               }

  ngOnInit() : void{

    let promises: Promise<any>[] = [this.opportunitiesService.getJobOpportunities()];

    Promise.all(promises).then(data => {
      this.opportunities = data[0];
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['opportunities']) {
      this.opportunities = changes['opportunities'].currentValue;
      
    }
  }

  ngAfterViewChecked() {
   
  }

}
