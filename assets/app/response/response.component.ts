import { isArray } from 'util';
import { Answer, UserResponse } from './user-response.model';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../shared/survey.service';
import { ResponseService } from '../shared/response.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/Rx';

@Component({
    selector: 'app-response',
    templateUrl: './response.component.html',
    providers: [ResponseService, SurveyService]
})

export class ResponseComponent implements OnInit {
    public surveyObject;
    public demoChk = [];
    // public checkedOption;
    // public submitted: boolean;
    // public answer: FormGroup;

    constructor(private surveyService: SurveyService, private route: ActivatedRoute, private responseService: ResponseService, private fb: FormBuilder){}

    ngOnInit() {
        // this.answer = this.fb.group({
        //     response: this.fb.group({
        //         question: [''],
        //         answers: ['']
        //     })
        // });

        let pk: string;
        this.route.params.subscribe(params => {
            pk = params['id'];
        });
        this.surveyService.getPublicSurvey(pk)
        .subscribe(
            data => {
                let response = data.obj;
                this.surveyObject = this.surveyService.convertToJSON(response.rawtext);
            },
            err => console.error(err)
        );
    }

    isObject() {
        return typeof this.surveyObject != 'string';
    }

    updateChecked(value,event){
        if(event.target.checked){
          this.demoChk.push(value);
        }
        else if (!event.target.checked){
          let indexx = this.demoChk.indexOf(value);
          this.demoChk.splice(indexx,1);
        }
        console.log(this.demoChk);
      }

    // Survey Form
    onSubmit(f: NgForm) {
        console.log(this.surveyObject);
        console.log(f.value);
        // this.responseService.saveResponse(f)
        // .subscribe(
        //     data => {
        //         console.log(data);
        //     },
        //     err => console.log(err)
        // );
    }

    // onSubmit({value, valid}: {value: Answer, valid: boolean}){
    //     this.submitted = true;
    //     console.log(value);
        
    // }
}