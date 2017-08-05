import { Survey } from './survey.model';
import { SurveyService } from '../shared/survey.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: `
          <h3>admin panel</h3>

          Admin Link: <a href='{{ baseUrl }}{{ data['adminkey'] }}'>
              {{ baseUrl }}{{ data['adminkey'] }}


    `
})

export class AdminComponent implements OnInit {
    private baseUrl: string = 'localhost:3000/survey/';
    private data: Object;
    private publicKey: string;
    private backToi: number;
    constructor(private surveyService: SurveyService){}

    ngOnInit() {
        this.data = this.surveyService.getSurvey();
        this.publicKey = this.data['surveyid'].toString(36);
    }
}
        //   Public Link: <a href='{{ baseUrl }}{{ publicKey }}'>
        //       {{ baseUrl }}{{ publicKey }}</a>