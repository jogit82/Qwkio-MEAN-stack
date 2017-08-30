import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { UserResponse } from "../response/user-response.model";
import 'rxjs/Rx';

@Injectable()
export class ResponseService {
    constructor(private http: Http) {}
    public saveResponse(data) {
        const baseUrl = 'http://localhost:3000/response';
        const body = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(baseUrl, body, {headers})
        .map(res => res.json())
        .catch(
            (error: Response) => Observable.throw(error.json())
        );
    }

    public getResponses(surveyid: number) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/admin/results/' + surveyid, {headers})
        .map(res => res.json())
        .catch(
            (error: Response) => Observable.throw(error.json())
        );
    }
}