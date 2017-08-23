import { ThankyouComponent } from './home/thankyou.component';
import { ResponseComponent } from './response/response.component';
import { SurveyPreviewComponent } from './survey/survey-preview.component';
import { AdminComponent } from './survey/admin.component';
import { LegalComponent } from './home/legal.component';
import { ExamplesComponent } from './home/examples.component';
import { GuidelinesComponent } from './home/guidelines.component';
import { AboutComponent } from './home/about.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SurveyComponent } from './survey/survey.component';


const appRoutes: Routes = [
    { path: 'admin/:id', component: AdminComponent },
    { path: 'about', component: AboutComponent },
    { path: 'examples', component: ExamplesComponent },
    { path: 'guidelines', component: GuidelinesComponent },
    { path: 'legal', component: LegalComponent },
    { path: 'thankyou', component: ThankyouComponent },
    { path: 'create', component: SurveyComponent },
    { path: ':id', component: ResponseComponent},
    { path: '', redirectTo: '/create', pathMatch: 'full' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);