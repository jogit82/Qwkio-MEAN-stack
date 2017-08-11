import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { UserResponse } from "../response/user-response.model";
import 'rxjs/Rx';

@Injectable()
export class ResponseService {
    constructor(private http: Http) {}

    public saveResponse(formValues) {
        // console.log(formValues);
        const baseUrl = 'http://localhost:3000/response';
        // const body = JSON.stringify(userResponse);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(baseUrl, {headers})
        .map(res => res.json())
        .catch(
            (error: Response) => Observable.throw(error.json())
        );
    }

    // public getSurvey(adminkey: string) {
    //     const headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     return this.http.get('http://localhost:3000/admin/api/' + adminkey, {headers})
    //     .map(res => res.json())
    //     .catch(
    //         (error: Response) => Observable.throw(error.json())
    //     );
    // }

    // public getPublicSurvey(pk: string) {
    //     const headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     return this.http.get('http://localhost:3000/pk/' + pk, {headers})
    //     .map(res => res.json())
    //     .catch(
    //         (error: Response) => Observable.throw(error.json())
    //     );
    // }
}