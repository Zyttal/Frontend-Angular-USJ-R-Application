import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StudentRequest } from '../data-models/students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseURL: string = "http://localhost/usjr-app/api/"

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(this.baseURL + 'getstudents.php')
  }

  getStudentInfo(studid: number): Observable<any> {
    return this.http.post<any>(`${this.baseURL}getstudentinfo.php`, {studid});
  }

  addStudent(studentData: StudentRequest): Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(studentData);
    console.log(body);
    return this.http.post(`${this.baseURL}savestudent.php`, body)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  modifyStudentDetails(studentData: StudentRequest): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.baseURL + 'poststudentupdates.php',JSON.stringify(studentData))
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  removeStudent(studentId: number): Observable<any> {
    return this.http.post<any>(this.baseURL + 'removestudent.php', {studid :studentId});
  }

}
