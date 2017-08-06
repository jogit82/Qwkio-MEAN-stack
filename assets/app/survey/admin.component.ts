import { DomSanitizer } from '@angular/platform-browser';
import { Survey } from './survey.model';
import { SurveyService } from '../shared/survey.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: `
        <h3>admin panel</h3>
        <p>Public Link: <a href="http://localhost:3000/{{ publicKey }}">http://localhost:3000/{{ publicKey }}</a></p>
        <p>Admin Link: <a href="http://localhost:3000/survey/{{ adminKey }}">http://localhost:3000/survey/{{ adminKey }}</a></p>
    `
})

export class AdminComponent implements OnInit {
    private publicKey: string;
    private adminKey: string;
    constructor(private surveyService: SurveyService, private sanitizer: DomSanitizer){}

    ngOnInit() {
        const data = this.surveyService.getSurvey();
        this.publicKey = data['surveyid'].toString(36);
        this.adminKey = data['adminkey'];
    }
}