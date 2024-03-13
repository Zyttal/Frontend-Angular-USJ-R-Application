import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Program } from '../data-models/programs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  baseURL: string = "http://localhost:8000/usjr-app/api/programs/"

  constructor(private http: HttpClient) { }

  getPrograms(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  getProgram(progid: number): Observable<any> {
    return this.http.get(`${this.baseURL}` + `${progid}/`);
  }

  addProgram(program: Program): Observable<any> {
    const headers = {'content-type': 'application/json'};
    return this.http.post(`${this.baseURL}`, JSON.stringify(program), {headers:headers})
  }

  removeProgram(progid: number): Observable<any> {
    return this.http.delete(this.baseURL + `${progid}/`);
  }

  modifyProgramDetails(programData:Program): Observable<any> {
    const headers = {'content-type': 'application/json'};
    return this.http.patch(this.baseURL + `${programData.progid}/`, JSON.stringify(programData), {headers:headers})
  }
}
