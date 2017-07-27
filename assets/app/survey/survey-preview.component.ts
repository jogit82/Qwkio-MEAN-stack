import { QueueAction } from 'rxjs/scheduler/QueueAction';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-survey-preview',
    templateUrl: './survey-preview.component.html'
})

export class SurveyPreviewComponent {
    @Input() surveyObject;


    display() {
        console.log(this.surveyObject);
    }

}