import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Student } from '../data-models/students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseURL: string = "http://localhost:8000/usjr-app/api/students/";

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(this.baseURL)
  }

  getStudentInfo(studid: number): Observable<any> {
    return this.http.get(this.baseURL + `${studid}/`);
  }

  addStudent(studentData: Student): Observable<any> {
    const headers = {'content-type': 'application/json'};
    return this.http.post(`${this.baseURL}`, JSON.stringify(studentData), {headers:headers});
  }

  modifyStudentDetails(studentData: Student): Observable<any> {
    const headers = {'content-type': 'application/json'};
    return this.http.patch(`${this.baseURL}${studentData.studid}/`,JSON.stringify(studentData), {headers:headers})
  }

  removeStudent(studid: number): Observable<any> {
    return this.http.delete(this.baseURL + `${studid}/`);
  }

}
