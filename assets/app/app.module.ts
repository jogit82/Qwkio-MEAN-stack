import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { SurveysComponent } from './surveys/surveys.component';

@NgModule({
    declarations: [
        AppComponent
        // HeaderComponent,
        // SurveysComponent
    ],
    imports: [
        BrowserModule
        // AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}