import { SurveyService } from './shared/survey.service';
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [SurveyService]
})
export class AppComponent {

    counterValue = 0;
    // loadedFeature = 'survey';

    // onNavigate(feature: string) {
    //     this.loadedFeature = feature;
    // }
}