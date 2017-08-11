export class UserResponse {
    constructor(public answers: any,
                public surveyid: number,
                public userkey: string,
                public timestamp: any){}
}

export class Answer {
    public question: number;
    public answer: string;
}