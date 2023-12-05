import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseURL: string = "http://localhost/usjr-app/api/"

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<any> {
    return this.http.get(this.baseURL + 'getdepartments.php');
  }
}
