import { LegalComponent } from './home/legal.component';
import { ExamplesComponent } from './home/examples.component';
import { GuidelinesComponent } from './home/guidelines.component';
import { AboutComponent } from './home/about.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SurveyComponent } from './survey/survey.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/create', pathMatch: 'full' },
    { path: 'create', component: SurveyComponent },
    { path: 'about', component: AboutComponent },
    { path: 'examples', component: ExamplesComponent },
    { path: 'guidelines', component: GuidelinesComponent },
    { path: 'legal', component: LegalComponent }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);