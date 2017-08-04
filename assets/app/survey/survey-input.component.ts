import { Event } from '@angular/router';
import { SurveyService } from '../shared/survey.service';
import { Survey } from './survey.model';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-survey-input',
    templateUrl: './survey-input.component.html'
})

export class SurveyInputComponent {
    @Output() previewClicked = new EventEmitter<any>();
    private surveyObject;
    constructor(private surveyService: SurveyService) {}

    onPreview(rawtext: string) {
        this.surveyObject = this.surveyService.convertToJSON(rawtext);
        this.previewClicked.emit(this.surveyObject);
    }

    isValidSurvey() {
        return typeof this.surveyObject != 'string';
    }

    onSubmit(rawtext: string){
        console.log("onSubmit");
        this.surveyService.saveSurvey(rawtext);
    }
    
}