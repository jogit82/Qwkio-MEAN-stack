import { HttpModule } from '@angular/http';
import { LegalComponent } from './home/legal.component';
import { ExamplesComponent } from './home/examples.component';
import { GuidelinesComponent } from './home/guidelines.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './home/about.component';
import { HeaderComponent } from './header/header.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyInputComponent } from './survey/survey-input.component';
import { SurveyPreviewComponent } from './survey/survey-preview.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SurveyComponent,
        SurveyInputComponent,
        SurveyPreviewComponent,
        AboutComponent,
        GuidelinesComponent,
        ExamplesComponent,
        LegalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}