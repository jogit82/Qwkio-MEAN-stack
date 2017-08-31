import { ResponseService } from '../shared/response.service';
import { ActivatedRoute } from '@angular/router';
import { Survey } from './survey.model';
import { SurveyService } from '../shared/survey.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: `
    <div class="col-md-8">
        <h4><strong>Information About Your Survey</strong></h4>
        <h4><small>Survey is {{status}}.</small></h4>
        <h5><strong>Public Link</strong></h5>
        <p>Share this link with anyone you want to answer your survey.  Be sure to check over your survey first to make sure everything looks okay. If anything's wrong, just hit the back button and create another one.</p>
        <div class="input-group">
            <input type="text" class="form-control" [(ngModel)]="publicURL">
            <span class="input-group-btn">
              <button class="btn btn-default" [class.btn-warning]="isCopied1" type="button" ngxClipboard [cbContent]="publicURL" (cbOnSuccess)="isCopied1 = true">Copy</button>
              <a href="http://localhost:3000/{{ publicKey }}" class="btn btn-default" target="_blank">Go to survey</a>
            </span>
        </div>
        <br>
        <h5><strong>Private Link</strong></h5>
        <p>Keep this link private!  It will allow you to download your survey results, see how many people have responded, or close the survey.<u>DO NOT</u> lose this link!  Since Qwk.io is completely anonymous, there is no way to get it back if you lose it.</p>
        <div class="input-group">
            <input type="text" class="form-control" [(ngModel)]="privateURL">
            <span class="input-group-btn">
                <button class="btn btn-default" [class.btn-warning]= "isCopied2" type="button" ngxClipboard [cbContent]="privateURL" (cbOnSuccess)="isCopied2 = true">Copy</button>
                <button class="btn btn-default" type="button" (click)="getResults()">Download results</button>
                <button class="btn btn-default" type="button" [class.btn-success]="value === 'Open survey'" [class.btn-danger]="value === 'Close survey'" (click)="changeStatus()">{{value}}</button>
            </span>
        </div>
        <br>
        <div>
            <p><small>
            Note: When you close your survey, anyone who visits your survey's public URL will get an error message saying the survey has been
            closed.  You will still be able to access the survey results even after you close a survey.  Don't worry if you close a
            survey by mistake, you can always re-open it again.
            </small></p>
        </div>
    </div>
    `
})

export class AdminComponent implements OnInit {
    private publicKey: string;
    private adminKey: string;
    public value: string;
    public toggle: boolean = true;
    public publicURL: string;
    public privateURL: string;
    public status: string;
    public returnedSurveyData: Object = {};
    public returnedResponses: Object;
    public JSONresult: any;
    public resultObj: Object = {};
    isCopied1: boolean = false;
    isCopied2: boolean = false;
    
    constructor(private surveyService: SurveyService, private responseService: ResponseService, private route: ActivatedRoute){}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.adminKey = params['id'];
            console.log(this.adminKey);
        });
        this.surveyService.getSurvey(this.adminKey)
        .subscribe(
            data => {
                if (data.obj.closed === false){
                    this.value = 'Close survey';
                    this.status = 'open';
                }
                else if (data.obj.closed === true){
                    this.value = 'Open survey';
                    this.status = 'closed';
                }
                this.returnedSurveyData = data.obj;
                this.publicKey = (this.returnedSurveyData['surveyid']).toString(36);
                this.publicURL = 'http://localhost:3000/' + this.publicKey;
                this.privateURL = 'http://localhost:3000/admin/' + this.adminKey;
            },
            err => console.error(err)
        );
    }

    changeStatus(){
        if (this.value === 'Open survey'){
            this.surveyService.open(this.adminKey).subscribe(
                data => {
                    this.value = 'Close survey';
                    this.status = 'open';
                },
                err => console.error(err)
            );
            
        }
        else if (this.value === 'Close survey'){
            this.surveyService.close(this.adminKey).subscribe(
                data => {
                    this.value = 'Open survey';
                    this.status = 'closed';
                },
                err => console.error(err)
            );
        }
    }
    getResults() {
        // this.resultObj = this.surveyService.convertToJSON(this.returnedSurveyData['rawtext']);
        console.log("this.returnedSurveyData.surveyid :" + this.returnedSurveyData['surveyid']);
        this.responseService.getResponses(this.returnedSurveyData['surveyid'])
        .subscribe(
            data => {
                this.returnedResponses = data.obj;
                if (this.returnedResponses['length'] === 0) {
                    console.log("No responses yet.");
                }
                else {
                    this.resultObj = this.surveyService.convertToJSON(this.returnedSurveyData['rawtext']);
                    // console.log(this.resultObj);
                    /* Make a this.resultObj Object by combining Response and Survey Object
                    For each survey, we want to start with title and description.
                    Then we want to use survey Object as a base and look for response which has the answer = option.id, count ++
                    */
                    
                    // this.resultObj = this.surveyService.convertToJSON(this.returnedSurveyData['rawtext']);
    
                    /* Loop through each question
                    Depending on queston type, we extract answers from returnedResponse object differently
                    */
                    for(let i = 0; i < this.resultObj['questions'].length; i ++){
                        let qNum = this.resultObj['questions'][i].idx;            
                        if(this.resultObj['questions'][i].type === 'checkbox'){ // if Q is checkbox type, we count answer of all responses by looping through answer of that question #
                            for (let j = 0; j < this.returnedResponses['length']; j ++) {
                                let responses = this.returnedResponses[j]['answers'][qNum - 1];
                                let individualOption = responses.answer.split(',');  // because checkbox question allows multiple options ["1, 2, 3"], so we split it up and loop through each one
                                for (let k = 0; k < individualOption.length; k ++) {
                                    this.resultObj['questions'][i].options[individualOption[k] - 1].count += 1;
                                }                    
                            }
                        }
                        else if(this.resultObj['questions'][i].type === 'radio'){ // if radio, we loop through responses and only get answer of that question
                            for (let j = 0; j < this.returnedResponses['length']; j ++) {
                                let response = this.returnedResponses[j]['answers'][qNum - 1].answer;
                                this.resultObj['questions'][i].options[response - 1].count += 1;
                            }
                        }
                        else if(this.resultObj['questions'][i].type === 'pointrating'){ // if pointrating, we loop through responses and only get answer of that question
                            for (let j = 0; j < this.returnedResponses['length']; j ++) {
                                let response = this.returnedResponses[j]['answers'][qNum - 1].answer;
                                this.resultObj['questions'][i].options[response - 1].count += 1;
                            }
                        }
                        else if(this.resultObj['questions'][i].type === 'dropdown'){ // if dropdown, we loop through responses and only get answer of that question
                            for (let j = 0; j < this.returnedResponses['length']; j ++) {
                                let response = this.returnedResponses[j]['answers'][qNum - 1].answer;
                                this.resultObj['questions'][i].options[response - 1].count += 1;
                            }
                        }
                        else if(this.resultObj['questions'][i].type === 'singleline' || this.resultObj['questions'][i].type === 'multiline'){
                            for (let j = 0; j < this.returnedResponses['length']; j ++) {
                                this.resultObj['questions'][i].input.push(this.returnedResponses[j]['answers'][qNum - 1].answer);
                            }
                        }
                    }
                }
                // this.JSONresult = JSON.stringify(this.resultObj);
                console.log(this.resultObj);
            },
            err => console.error(err)
        );
    } // end of getResult()
}