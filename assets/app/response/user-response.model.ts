import { isObject } from 'rxjs/util/isObject';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
export class UserResponse {
    constructor(public answers: any,
                public surveyid: number,
                public userkey: string,
                public timestamp: any){}
}

export class Answer {
    constructor(
        public response: {
            question: number;
            answers: string;
    }){}
}

/* 
FormGroup -> 'answer'
    FormGroup -> 'response'
        FormControl -> 'question'
        FormControl -> 'answers'
*/
