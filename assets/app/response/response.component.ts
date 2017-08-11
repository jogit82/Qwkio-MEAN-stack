import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../shared/survey.service';
import { ResponseService } from '../shared/response.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
    selector: 'app-response',
    templateUrl: './response.component.html'
})

export class ResponseComponent implements OnInit {
    public surveyObject;
    constructor(private surveyService: SurveyService, private route: ActivatedRoute, private responseService: ResponseService){}

    ngOnInit() {
        let pk: string;
        this.route.params.subscribe(params => {
            pk = params['id'];
        });
        this.surveyService.getPublicSurvey(pk)
        .subscribe(
            data => {
                let response = data.obj;
                this.surveyObject = this.surveyService.convertToJSON(response.rawtext);
            },
            err => console.error(err)
        );
    }

    isObject() {
        return typeof this.surveyObject != 'string';
    }

    // Survey Form
    onSubmit(f: NgForm) {
        console.log(this.surveyObject);
        console.log(f.controls['1'].value);
        this.responseService.saveResponse(f)
        .subscribe(
            data => {
                console.log("data");
            },
            err => console.log(err)
        );
    }
}