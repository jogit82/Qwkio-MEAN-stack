import { HomeComponent } from './home/home.component';
import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { SurveyInputComponent } from './survey/survey-input.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/create', pathMatch: 'full' },
    { path: 'create', component: SurveyInputComponent },
    { path: 'home', component: HomeComponent }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);