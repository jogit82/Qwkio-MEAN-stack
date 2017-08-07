import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Survey } from "../survey/survey.model";
import 'rxjs/Rx';

@Injectable()
export class SurveyService {
    constructor(private http: Http) {}

    public saveSurvey(survey: Survey) {
        const baseUrl = 'http://localhost:3000/admin';
        const body = JSON.stringify(survey);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(baseUrl, body, {headers})
        .map(res => res.json())
        .catch(
            (error: Response) => Observable.throw(error.json())
        );
    }

    public getSurvey(adminkey: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("GET SURVEY CALL");
        return this.http.get('http://localhost:3000/admin/' + adminkey, {headers})
        .map(res => res.json())
        .catch(
            (error: Response) => Observable.throw(error.json())
        );
        // return "data";
    }

    /*
    Helper method
    :Format validation - do not save to database if its not the right format
    :Rendering - Preview and Responses
    */
    convertToJSON(rawtext) {
        let obj2: any = {};
        let jsonObj: JSON;
        let title = '';
        let description = '';
        let questions = [];
        let reg_question = /^\d*\)(.*)$/;
        let reg_multichoice = /^\[ \](.*)$/;
        let reg_radio = /^\( \)(.*)$/;
        let reg_dropdown = /^\< \>(.*)$/;
        let reg_textbox = /^_{3,}\s*$/;
        let reg_pointrating = /^(\(\d+\)\s*){3,10}$/;
        let is_questionheader = false;
        let is_multichoice = false;
        let is_radio = false;
        let is_dropdown = false;
        let is_textbox = false;
        let is_pointrating = false;
        let curQuestion = null;
        let idx = 1;
        let lines = rawtext.split('\n');
        
        for (let line of lines) {
            line = line.trim();

            if (line === '') {
                continue;
            }
            
            is_questionheader = reg_question.test(line);
            is_multichoice = reg_multichoice.test(line);
            is_radio = reg_radio.test(line);
            is_dropdown = reg_dropdown.test(line);
            is_textbox = reg_textbox.test(line);
            is_pointrating = reg_pointrating.test(line);

            if (is_questionheader) {
                curQuestion = {}; // start a new question
                curQuestion['idx'] = idx;
                idx ++;
                questions.push(curQuestion); // then we can further manipulate a question that exists
                curQuestion['title'] = line.slice(line.indexOf(' ')).trim();
            }
            else if (is_multichoice && curQuestion) { // line is multiple choice checkbox
                let curOption = {};
                let i = 0;
                curQuestion['type'] = curQuestion['type'] || 'checkbox';
                curQuestion['options'] = curQuestion['options'] || [];
                curQuestion['options'].push(curOption);
                curOption['id'] = i;
                curOption['value'] = line.slice(line.indexOf(' ', parseInt(line.indexOf(' ') + 1))).trim();
                // curQuestion['options'].push(line.slice(line.indexOf(' ', parseInt(line.indexOf(' ') + 1))).trim());
            }
            else if (is_radio && curQuestion) { // line is radio options
                let curOption = {};
                let i = 0;
                curQuestion['type'] = curQuestion['type'] || 'radio';
                curQuestion['options'] = curQuestion['options'] || [];
                curQuestion['options'].push(curOption);
                curOption['id'] = i;
                curOption['value'] = line.slice(line.indexOf(' ', parseInt(line.indexOf(' ') + 1))).trim();
                // curQuestion['options'].push(line.slice(line.indexOf(' ', parseInt(line.indexOf(' ') + 1))).trim());
            }
            else if (is_dropdown && curQuestion) { // line is dropdown
                let curOption = {};
                let i = 0;
                curQuestion['type'] = curQuestion['type'] || 'dropdown';
                curQuestion['options'] = curQuestion['options'] || [];
                curQuestion['options'].push(curOption);
                curOption['id'] = i;
                curOption['value'] = line.slice(line.indexOf(' ', parseInt(line.indexOf(' ') + 1))).trim();
                // curQuestion['options'].push(line.slice(line.indexOf(' ', parseInt(line.indexOf(' ') + 1))).trim());
            }
            else if (is_textbox && curQuestion) { // line is text input box
                if (curQuestion['type'] === 'singleline') { // already have a singleline, so let's upgrade it to a multiline
                    curQuestion['type'] = 'multiline';
                }
                else if (curQuestion['type'] !== 'multiline') {
                    curQuestion['type'] = 'singleline';
                }
            }
            else if (is_pointrating && curQuestion) { // line is point rating
                curQuestion['type'] = curQuestion['type'] || 'pointrating';
                let numberOfPoints = line.split("(").length - 1;
                // curQuestion['points'] = (line.split("(").length - 1);
                curQuestion['options'] = curQuestion['options'] || [];
                for (let i = 1; i < numberOfPoints + 1; i ++) {
                    let curOption = {};
                    curQuestion['options'].push(curOption);
                    curOption['id'] = i;
                    curOption['value'] = i;
                }
            }
            else if (curQuestion && !curQuestion['type']) { // no format match but we are in a question, make this a question subtext
                curQuestion['subtitle'] = line;
            }
            else if (curQuestion === null) {
                if (obj2['title'] === undefined) {
                    obj2['title'] = line;
                    continue;
                }
                obj2['description'] = line;
            }
        }
        if (questions.length === 0) {
            return "Sorry, invalid format. Please refer to our survey guidelines.";
        }
        else {
            obj2['questions'] = questions;
            jsonObj = <JSON>obj2;
            return jsonObj;
        }
    }
}
/*
let obj1: any = {
            'title': 'survey title',
            'description': 'example description',
            'questions': [{
                    'idx': 1,
                    'title': 'example question 1(checkbox)',
                    'subtitle': 'question subtitle',
                    'type': 'checkbox',
                    'options': [
                        'example checkbox option 1',
                        'example checkbox option 2',
                        'example checkbox option 3'
                    ]
            },
            {
                    'idx': 2,
                    'title': 'example question 2(radio)',
                    'type': 'radio',
                    'options': [
                        'example radio option 1',
                        'example radio option 2',
                        'example radio option 3'
                    ]
            },
            {
                    'idx': 3,
                    'title': 'example question 3(dropdown)',
                    'type': 'dropdown',
                    'options': [
                        'example dropdown option 1',
                        'example dropdown option 2',
                        'example dropdown option 3'
                    ]
            },
            {
                    'idx': 4,
                    'title': 'example question 4(singleline)',
                    'type': 'singleline'
            },
            {
                    'idx': 5,
                    'title': 'example question 4(multiline)',
                    'type': 'multiline'
            },
            {
                    'idx': 6,
                    'title': 'example question 4(pointrating)',
                    'type': 'pointrating',
                    'points': 5
            }]
        };
*/