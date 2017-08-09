import { isArray } from 'util';
export class UserResponse {
    constructor(public answers: any,
                public surveyid: number,
                public userkey: string,
                public timestamp: any){}
}