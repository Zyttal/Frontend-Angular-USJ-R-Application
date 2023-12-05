import { Department } from './../data-models/departments';
import { Component } from '@angular/core';
import { DepartmentService } from './department.service';
import { College } from '../data-models/colleges';
import { CollegeService } from '../colleges/college.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  departmentList: Department[] = [];
  collegeList: College[] = [];

  constructor(private departmentsDB: DepartmentService, private collegeDB: CollegeService){}

  ngOnInit(): void {
    this.getDepartments();
    this.getColleges();
  }

  private getDepartments(){
    this.departmentsDB.getDepartments().subscribe({
      next: response => {
        this.departmentList = response;
      },
      error: error => {
        console.error(error);
      }
    })
  }

  private getColleges(){
    this.collegeDB.getColleges().subscribe({
      next: response => {
        this.collegeList = response;
      },
      error: error => {
        console.error(error);
      }
    })
  }

  public getCollegeFullName(collid: number): string {
    const matchedCollege = this.collegeList.find(college => college.collid == collid);
    return matchedCollege ? matchedCollege.collfullname : '';
  }
}
