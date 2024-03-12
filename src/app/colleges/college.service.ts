import { College } from './../data-models/colleges';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  baseURL: string = "http://localhost:8000/usjr-app/api/colleges/";

  constructor(private http: HttpClient) { }

  getColleges(): Observable<any> {
    return this.http.get(this.baseURL)
  }

  getCollegeInfo(collid: number): Observable<any> {
    return this.http.get(this.baseURL + `${collid}/`)
  }

  addCollege(college: College): Observable<any> {
    const headers = {'content-type': 'application/json'};
    return this.http.post(this.baseURL, JSON.stringify(college), { headers: headers})
  }

  modifyCollegeDetails(collegeData:College): Observable<any> {
    const headers = {'content-type': 'application/json'};
    return this.http.patch(`${this.baseURL}${collegeData.collid}/`, JSON.stringify(collegeData), { headers: headers})
  }

  removeCollege(collid: number): Observable<any> {
    return this.http.delete(this.baseURL + `${collid}/`)
  }
}
