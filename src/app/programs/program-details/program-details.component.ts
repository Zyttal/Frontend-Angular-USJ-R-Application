import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { College } from 'src/app/data-models/colleges';
import { Location } from '@angular/common';
import { CollegeService } from 'src/app/colleges/college.service';
import { ActivatedRoute} from '@angular/router';
import { ProgramService } from '../program.service';
import { Program } from 'src/app/data-models/programs';
import { Department } from 'src/app/data-models/departments';
import { DepartmentService } from 'src/app/departments/department.service';
import { SnackbarService } from 'src/app/snackbar.service';
import { StudentService } from 'src/app/students/student.service';
import { Student } from 'src/app/data-models/students';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent {
  programForm : FormGroup;
  collegeList: College[] = [];
  departmentList: Department[] = [];
  studentsList: Student[] = [];
  progid: number;
  program : Program;

  constructor(public location: Location,
    private collegeDB: CollegeService,
    private route: ActivatedRoute,
    private progDB: ProgramService,
    private formBuilder: FormBuilder,
    private deptDB: DepartmentService,
    private notifications: SnackbarService,
    private studentsDB : StudentService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.progid = +params.get('id');
      this.getProgramDetails(this.progid);
    });

    this.programForm = new FormGroup({
      progid: new FormControl(null, [Validators.required]),
      progfullname: new FormControl(null, [Validators.required]),
      progshortname: new FormControl(null, [Validators.required]),
      selectedCollege: new FormControl(null, [Validators.required]),
      selectedDepartment: new FormControl(null, [Validators.required])
    })

    this.getColleges();
    this.getDepartments();
    this.getStudents();
  }


  public goBack(){
    this.location.back();
  }

  public getCollegeFullName(collid: number): string {
    const matchedCollege = this.collegeList.find(college => college.collid == collid);
    return matchedCollege ? matchedCollege.collfullname : '';
  }

  public getDepartmentFullName(deptid: number): string {
    const matchedDepartment = this.departmentList.find(department => department.deptid == deptid);
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

  private getStudents(){
    this.studentsDB.getStudents().subscribe({
      next: response => {
        this.studentsList = response;
      },
      error: error => {
        console.log('Response has Failed');
        console.log(error);
      }
    })
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

  private getProgramDetails(progid: number){
    this.progDB.getProgram(progid).subscribe({
      next: response => {
        this.program = response;
        this.programForm = this.formBuilder.group({
          progid: [{value: this.program.progid, disabled: true}],
          progfullname: [this.program.progfullname],
          progshortname: [this.program.progshortname],
          selectedCollege: [this.program.progcollid],
          selectedDepartment: [this.program.progcolldeptid],
        })
      }
    })
  }

  public deleteProgram(progid: number){

    this.progDB.removeProgram(progid).subscribe({
      error: error => {
        console.error(error);
      },
      complete: () => {
        this.notifications.openSnackBar("Program Successfully Deleted!");
        this.goBack();
      }
    })
  }

  public saveModifications(): void{
    if(this.programForm.valid){
      const formData = this.programForm.value;

      const updatedProgram: Program = {
        progfullname: formData.progfullname,
        progshortname: formData.progshortname,
        progcollid: formData.selectedCollege,
        progcolldeptid: formData.selectedDepartment,
        progid: this.program.progid,
      }

      console.log(updatedProgram);

      this.progDB.modifyProgramDetails(updatedProgram).subscribe({
        error: error => {
          console.error(error);
        },
        complete: () => {
          this.notifications.openSnackBar("Program Details Successfully Modified!");
          this.goBack();
        }
      })
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
