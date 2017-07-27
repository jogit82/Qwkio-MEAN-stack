import { SurveyService } from './shared/survey.service';
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [SurveyService]
})
export class AppComponent {
    // loadedFeature = 'survey';

    // onNavigate(feature: string) {
    //     this.loadedFeature = feature;
    // }
}