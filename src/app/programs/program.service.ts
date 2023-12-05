import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Program } from '../data-models/programs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  baseURL: string = "http://localhost/usjr-app/api/"

  constructor(private http: HttpClient) { }

  getPrograms(): Observable<any> {
    return this.http.get(this.baseURL + 'getprograms.php');
  }

  getProgram(progid: number): Observable<any> {
    return this.http.post(this.baseURL + 'getprograminfo.php', {progid});
  }

  addProgram(program: Program): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(this.baseURL + 'saveprogram.php', JSON.stringify(program))
      .pipe(catchError(error => {
        throw error;
      }))
  }

  removeProgram(progid: number): Observable<any> {
    return this.http.post<any>(this.baseURL + 'removeprogram.php', {progid :progid});
  }

  modifyProgramDetails(programData:Program): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(this.baseURL + 'postprogramupdates.php', JSON.stringify(programData))
      .pipe(catchError(error => {
        throw error;
      }))
  }
}
