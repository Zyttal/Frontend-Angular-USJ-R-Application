import { College } from './../data-models/colleges';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  baseURL: string = "http://localhost/usjr-app/api/"

  constructor(private http: HttpClient) { }

  getColleges(): Observable<any> {
    return this.http.get(this.baseURL + 'getcolleges.php');
  }

  getCollegeInfo(collid: number): Observable<any> {
    return this.http.post<any>(`${this.baseURL}getcollegeinfo.php`, {collid});
  }

  addCollege(college: College): Observable<any> {
    // const headers = {'content-type': 'application/json'};
    return this.http.post(this.baseURL + 'savecollege.php', JSON.stringify(college))
      .pipe(catchError(error => {
        throw error;
      }))
  }

  modifyCollegeDetails(collegeData:College): Observable<any> {
    return this.http.post(this.baseURL + 'postcollegeupdates.php', JSON.stringify(collegeData))
      .pipe(catchError(error => {
        throw error;
      }))
  }

  removeCollege(collid: number): Observable<any> {
    return this.http.post<any>(this.baseURL + 'removecollege.php', {collid: collid});
  }
}
