import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../shared/survey.service';
import { ResponseService } from '../shared/response.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
    selector: 'app-response',
    templateUrl: './response.component.html',
    providers: [ResponseService, SurveyService]
})

export class ResponseComponent implements OnInit {
    public surveyObject;
    public checkboxValueObject: Object;
    public listOfCheckboxQuestion: any[] = [];
    public answers: any[] = [];

    constructor(private surveyService: SurveyService, private route: ActivatedRoute, private responseService: ResponseService){}

    ngOnInit() {
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

    updateChecked(value, questionNum, event){
        if(event.target.checked){
            console.log("moo");
            // construct answers(Object, global) but only construct one object for each question with multiple values
            // answers[0] = {
            //    question: i + 1,
            //     answer: values
            // }
            if (this.answers[questionNum - 1].question == questionNum){
                console.log("not in the answers");
            }
            else 
                console.log("Its already in the answers");
        //   this.demoChk.push(value);
        }
        else if (!event.target.checked){
        //   let indexx = this.demoChk.indexOf(value);
        //   this.demoChk.splice(indexx,1);
        }
        // console.log(this.demoChk.toString());
      }

    // Survey Form
    onSubmit(f: NgForm) {
        const numOfQuestion = this.surveyObject.questions.length;
        // format response exactly to the number of questions
        // let say we have 6 questions, so we need six answers(optional questions will be empty string '')
        for (let i = 0; i < numOfQuestion; i ++){
            this.answers[i] = {
                question: i + 1,
                answer: f.value[i + 1]
            }
        }
        console.log(this.answers);

        this.responseService.saveResponse(this.answers)
        .subscribe(
            data => {
                console.log(data); // TODO: redirect to thank you page
            },
            err => console.log(err)
        );
    }
}