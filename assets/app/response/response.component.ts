import { Router, ActivatedRoute } from '@angular/router';
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
    public isClosed;
    public checkboxValues: any[] = [];
    public answers: any[] = [];

    constructor(private surveyService: SurveyService, private route: ActivatedRoute, private router: Router, private responseService: ResponseService){}

    ngOnInit() {
        let pk: string;
        this.route.params.subscribe(params => {
            pk = params['id'];
        });
        this.surveyService.getPublicSurvey(pk)
        .subscribe(
            data => {
                let response = data.obj;
                this.isClosed = true;
                console.log(this.isClosed);
                this.surveyObject = this.surveyService.convertToJSON(response.rawtext);
            },
            err => console.error(err)
        );
    }

    isOpen() {
        return !this.isClosed != false;
    }

    updateChecked(value, questionNum, questionType, event){
        var answer = questionNum + '_' + value;
        if(event.target.checked){
            this.checkboxValues.push(answer);
        }
        else if (!event.target.unchecked){
          let indexx = this.checkboxValues.indexOf(answer);
          this.checkboxValues.splice(indexx,1);
        }
      }

    // Survey Form
    onSubmit(f: NgForm) {
        var regQA = /^(\d+)_(\d+)$/;
        const numOfQuestion = this.surveyObject.questions.length;
        for (let i = 0; i < numOfQuestion; i ++){
            this.answers[i] = {
                question: i + 1,
                answer: f.value[i + 1]
            }
            if (this.answers[i].answer === false)
                this.answers[i].answer = '';
        }
        if (this.checkboxValues){
            this.checkboxValues.sort();
            for (var i = 0; i < this.checkboxValues.length; i ++) {
                var q = regQA.exec(this.checkboxValues[i]);
                if (this.answers[parseInt(q[1]) - 1 ].answer === true || this.answers[parseInt(q[1]) - 1 ].answer === false) {
                    this.answers[parseInt(q[1]) - 1 ].answer = q[2];
                }
                else 
                    this.answers[parseInt(q[1]) - 1 ].answer += ',' + q[2];
            }
        }
        let data = { 
            answers: this.answers,
            surveyid : this.surveyid
        }

        this.responseService.saveResponse(data)
        .subscribe(
            data => {
                this.router.navigate(['/thankyou']);
            },
            err => console.log(err)
        );
    }
}