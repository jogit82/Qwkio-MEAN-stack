import { ActivatedRoute } from '@angular/router';
import { Survey } from './survey.model';
import { SurveyService } from '../shared/survey.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: `
        <h3>admin panel</h3>
        <p>Public Link: <a href="http://localhost:3000/{{ publicKey }}">http://localhost:3000/{{ publicKey }}</a></p>
        <p>Admin Link: <a href="http://localhost:3000/admin/{{ adminKey }}">http://localhost:3000/admin/{{ adminKey }}</a></p>
    `
})

export class AdminComponent implements OnInit {
    private publicKey: string;
    private adminKey: string;
    constructor(private surveyService: SurveyService, private route: ActivatedRoute){}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.adminKey = params['id'];
        });
        this.surveyService.getSurvey(this.adminKey)
        .subscribe(
            data => {
                console.log(data);
                this.publicKey = (data.obj.surveyid).toString(36);
            },
            err => console.error(err)
        );
    }


}