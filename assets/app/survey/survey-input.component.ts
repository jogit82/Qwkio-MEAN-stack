import { Router } from '@angular/router';
import { SurveyService } from '../shared/survey.service';
import { Survey } from './survey.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
    selector: 'app-survey-input',
    templateUrl: './survey-input.component.html'
})

export class SurveyInputComponent {
    @Output() previewClicked = new EventEmitter<any>();
    private surveyObject;
    private survey: Survey;
    constructor(private surveyService: SurveyService, private router: Router) {}

    onPreview(rawtext: string) {
        this.surveyObject = this.surveyService.convertToJSON(rawtext);
        this.previewClicked.emit(this.surveyObject);
    }

    isValidSurvey() {
        return typeof this.surveyObject != 'string';
        // TODO: Need a better way of doing this.
    }

    onSubmit(rawtext: string){
        const survey = new Survey(rawtext);
        this.surveyService.saveSurvey(survey)
        .subscribe(
            data => {
                this.survey = data.obj;
                this.router.navigate(['/admin/', this.survey.adminkey]);
            },
            err => console.error(err)
        );
    }
}