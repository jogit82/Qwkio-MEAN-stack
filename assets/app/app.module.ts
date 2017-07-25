import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyInputComponent } from './survey/survey-input.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SurveyComponent,
        SurveyInputComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}