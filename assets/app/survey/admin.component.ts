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
        <label class="toggle col-sm-8">
            <input type="button" value="{{value}}" (click)="changeStatus()">
            <span class="handle"></span>
        </label>
    `
})

export class AdminComponent implements OnInit {
    private publicKey: string;
    private adminKey: string;
    public value: string;
    public toggle: boolean = true;
    constructor(private surveyService: SurveyService, private route: ActivatedRoute){}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.adminKey = params['id'];
        });
        this.surveyService.getSurvey(this.adminKey)
        .subscribe(
            data => {
                // console.log(data);
                if (data.obj.closed === false)
                    this.value = 'Close';
                else {
                    this.value = 'Open';
                }
                this.publicKey = (data.obj.surveyid).toString(36);
            },
            err => console.error(err)
        );
    }

    changeStatus(){
        if (this.value === 'Open'){
            // this.surveyService.close();
            this.value = 'Close';
        }
        else 
            this.value = 'Open';
    }


}