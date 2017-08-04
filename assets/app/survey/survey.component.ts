import { Event } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-survey',
    templateUrl: `
        <div class="row">
            <app-survey-input (previewClicked)="survey = $event"></app-survey-input>
        </div>
        <div class="row">
            <app-survey-preview [surveyObject]="survey"></app-survey-preview>
        </div>   
    `
})

export class SurveyComponent {
    private survey: any;
}