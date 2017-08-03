import { QueueAction } from 'rxjs/scheduler/QueueAction';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-survey-preview',
    templateUrl: './survey-preview.component.html'
})

export class SurveyPreviewComponent {
    @Input() surveyObject;

    isObject() {
        return typeof this.surveyObject != 'string';
    }

    display() {
        console.log(this.surveyObject);
    }

}