import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { College } from 'src/app/data-models/colleges';
import { CollegeService } from 'src/app/colleges/college.service';
import { Program } from 'src/app/data-models/programs';
import { Department } from 'src/app/data-models/departments';
import { DepartmentService } from 'src/app/departments/department.service';
import { ProgramService } from '../program.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent {
  programForm : FormGroup;
  collegeList: College[] = [];
  departmentList: Department[] = [];

  selectedCollege: College = null;
  selectedDepartment: Department = null;

  constructor(public location: Location,
    private collegeDB: CollegeService,
    private deptDB: DepartmentService,
    private progDB: ProgramService,
    private notification:SnackbarService) {
    this.programForm = new FormGroup({
      progid: new FormControl(null, [Validators.required]),
      progfullname: new FormControl(null, [Validators.required]),
      progshortname: new FormControl(null, [Validators.required]),
      selectedCollege: new FormControl(null, [Validators.required]),
      selectedDepartment: new FormControl(null, [Validators.required])
    })

    this.getColleges();
    this.getDepartments();
  }

  private getDepartments(){
    this.deptDB.getDepartments().subscribe({
      next: response => {
        this.departmentList = response;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  public goBack(){
    this.location.back();
  }

  public getCollegeFullName(collid: number): string {
    const matchedCollege = this.collegeList.find(college => college.collid == collid);
    return matchedCollege ? matchedCollege.collfullname : '';
  }

  public getDepartmentFullName(deptid: number): string {
    const matchedDepartment = this.departmentList.find(department => department.deptcollid == deptid);
    return matchedDepartment ? matchedDepartment.deptfullname : '';
  }

  private getColleges(){
    this.collegeDB.getColleges().subscribe({
      next: response => {
        this.collegeList = response;
      },
      error: error => {
        console.log('Response has Failed.');
        console.log(error);
      }
    })
  }

  public saveProgramInfo(): void {
    if(this.programForm.valid) {
      const formData = this.programForm.value;

      const newProgram: Program = {
        progid: formData.progid,
        progfullname: formData.progfullname,
        progshortname: formData.progshortname,
        progcollid: formData.selectedCollege.collid,
        progcolldeptid: formData.selectedDepartment.deptid
      }

      this.progDB.addProgram(newProgram).subscribe({
        next: response => {
          this.notification.openSnackBar(response.status);
          if(response.code == 200)
            this.goBack();
        },
        error: error => {
          console.log(error);
        },
        complete: () => {}
      })
    }else{
      this.notification.openSnackBar("Form has some invalid inputs.");
    }
  }

  public getFilteredDepartments(): Department[] | null {
    const selectedCollege = this.programForm.get('selectedCollege');

    if (!selectedCollege || !selectedCollege.value || !selectedCollege.value.collid) {
      return null;
    }

    const collegeID = selectedCollege.value.collid;
    const filteredPrograms = this.departmentList.filter(department => department.deptcollid === collegeID);

    return filteredPrograms;
  }
}
