import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { UserResponse } from "../response/user-response.model";
import 'rxjs/Rx';

@Injectable()
export class ResponseService {
    constructor(private http: Http) {}
    public saveResponse(data) {
        const baseUrl = 'response';
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
        return this.http.get('admin/results/' + surveyid, {headers})
        .map(res => res.json())
        .catch(
            (error: Response) => Observable.throw(error.json())
        );
    }

    public exportAsExcelFile(table: any, excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
          type: "application/octet-stream"
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
      }
}