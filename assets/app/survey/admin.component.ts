import { ResponseService } from '../shared/response.service';
import { ActivatedRoute } from '@angular/router';
import { Survey } from './survey.model';
import { SurveyService } from '../shared/survey.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
    public publicKey: string;
    public adminKey: string;
    public value: string;
    public toggle: boolean = true;
    public publicURL: string;
    public privateURL: string;
    public status: string;
    public returnedSurveyData: Object = {};
    public returnedResponses: Object;
    public JSONresult: any;
    public resultObj: Object = {};
    public result = {};
    public showResult = false;
    isCopied1: boolean = false;
    isCopied2: boolean = false;

    // For Excel export
    public ws;
    @ViewChild('myResultTable') table;
    public tbl;
    
    constructor(private surveyService: SurveyService, private responseService: ResponseService, private route: ActivatedRoute){}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.adminKey = params['id'];
            // console.log("admin key: " + this.adminKey);
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
                this.getResults();
            },
            err => console.error(err)
        );
    }

    ngAfterViewInit() {
        if(this.table){
            this.tbl = this.table.nativeElement;
        }
    }

    exportToExcel(event) {
        this.tbl = this.table.nativeElement;
        this.responseService.exportAsExcelFile(this.tbl, 'result');
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
        // console.log("surveyid :" + this.returnedSurveyData['surveyid']);
        this.responseService.getResponses(this.returnedSurveyData['surveyid'])
        .subscribe(
            data => {
                this.returnedResponses = data.obj;
                let totalResponses = this.returnedResponses['length'];
                if (totalResponses === 0) {
                    console.log("No responses yet.");
                }
                else {
                    this.showResult = true;
                    this.resultObj = this.surveyService.convertToJSON(this.returnedSurveyData['rawtext']);
                    this.resultObj['totalResponses'] = totalResponses;

                    /* Make a this.resultObj Object by combining Response and Survey Object
                    For each survey, we want to start with title and description.
                    Then we want to use survey Object as a base and look for response which has the answer = option.id, count ++
                    */
                        
                    /* Loop through each question
                    Depending on queston type, we extract answers from returnedResponse object differently
                    */
                    for(let i = 0; i < this.resultObj['questions'].length; i ++){
                        let qNum = this.resultObj['questions'][i].idx;
                        
                        let totalSkipped = 0;            
                        if(this.resultObj['questions'][i].type === 'checkbox'){ // if Q is checkbox type, we count answer of all responses by looping through answer of that question #
                            for (let j = 0; j < this.returnedResponses['length']; j ++) {
                                if (this.returnedResponses[j]['answers'][qNum - 1].answer) {
                                    let responses = this.returnedResponses[j]['answers'][qNum - 1];
                                    let individualOption = responses.answer.split(',');  // because checkbox question allows multiple options ["1, 2, 3"], so we split it up and loop through each one
                                    for (let k = 0; k < individualOption.length; k ++) {
                                        this.resultObj['questions'][i].options[individualOption[k] - 1].count += 1;
                                        this.resultObj['questions'][i].options[individualOption[k] - 1].percent = Math.floor((this.resultObj['questions'][i].options[individualOption[k] - 1].count / totalResponses) * 100);
                                        
                                    }
                                }
                                else {
                                    // console.log("User key: " + this.returnedResponses[j]['userkey'] + " skipped Question " + qNum);
                                    totalSkipped ++;
                                }              
                            }
                            this.resultObj['questions'][i].skipped = totalSkipped;
                            
                            totalSkipped = 0;    
                        }
                        else if(this.resultObj['questions'][i].type === 'radio'){ // if radio, we loop through responses and only get answer of that question
                            for (let j = 0; j < this.returnedResponses['length']; j ++) {
                                if (this.returnedResponses[j]['answers'][qNum - 1].answer) {
                                    let response = this.returnedResponses[j]['answers'][qNum - 1].answer;
                                    this.resultObj['questions'][i].options[response - 1].count += 1;
                                    this.resultObj['questions'][i].options[response - 1].percent = Math.floor((this.resultObj['questions'][i].options[response - 1].count / totalResponses) * 100);
                                    
                                }
                                else {
                                    // console.log("User key: " + this.returnedResponses[j]['userkey'] + " skipped Question " + qNum);
                                    totalSkipped ++;
                                }
                            }
                            this.resultObj['questions'][i].skipped = totalSkipped;
                            
                            totalSkipped = 0;   
                        }
                        else if(this.resultObj['questions'][i].type === 'pointrating'){ // if pointrating, we loop through responses and only get answer of that question
                            for (let j = 0; j < this.returnedResponses['length']; j ++) {
                                if (this.returnedResponses[j]['answers'][qNum - 1].answer) {
                                    let response = this.returnedResponses[j]['answers'][qNum - 1].answer;
                                    this.resultObj['questions'][i].options[response - 1].count += 1;
                                    this.resultObj['questions'][i].options[response - 1].percent = Math.floor((this.resultObj['questions'][i].options[response - 1].count / totalResponses) * 100);
                                    
                                }
                                else {
                                    // console.log("User key: " + this.returnedResponses[j]['userkey'] + " skipped Question " + qNum);
                                    totalSkipped ++;
                                }
                            }
                            this.resultObj['questions'][i].skipped = totalSkipped;
                            
                            totalSkipped = 0;   
                        }
                        else if(this.resultObj['questions'][i].type === 'dropdown'){ // if dropdown, we loop through responses and only get answer of that question
                            for (let j = 0; j < this.returnedResponses['length']; j ++) {
                                if (this.returnedResponses[j]['answers'][qNum - 1].answer) {
                                    let response = this.returnedResponses[j]['answers'][qNum - 1].answer;
                                    this.resultObj['questions'][i].options[response - 1].count += 1;
                                    this.resultObj['questions'][i].options[response - 1].percent = Math.floor((this.resultObj['questions'][i].options[response - 1].count / totalResponses) * 100);
                                    
                                }
                                else {
                                    // console.log("User key: " + this.returnedResponses[j]['userkey'] + " skipped Question " + qNum);
                                    totalSkipped ++;
                                }
                            }
                            this.resultObj['questions'][i].skipped = totalSkipped;
                            
                            totalSkipped = 0;   
                        }
                        else if(this.resultObj['questions'][i].type === 'singleline' || this.resultObj['questions'][i].type === 'multiline'){
                            for (let j = 0; j < this.returnedResponses['length']; j ++) {
                                if (this.returnedResponses[j]['answers'][qNum - 1].answer){
                                    this.resultObj['questions'][i].input.push(this.returnedResponses[j]['answers'][qNum - 1].answer);
                                }
                                else {
                                    // console.log("User key: " + this.returnedResponses[j]['userkey'] + " skipped Question " + qNum);
                                    totalSkipped ++;
                                }
                            }
                            this.resultObj['questions'][i].skipped = totalSkipped;
                            
                            totalSkipped = 0;  
                        }
                    }
                }
                // this.JSONresult = JSON.stringify(this.resultObj);

                // To display result object as a DOM table
                // console.log(this.resultObj);
                this.result = this.resultObj;
            },
            err => console.error(err)
        );
    } // end of getResult()
}