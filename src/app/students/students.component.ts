import { Component, OnInit } from '@angular/core';
import { Student } from '../data-models/students';
import { StudentService } from './student.service';
import { CollegeService } from '../colleges/college.service';
import { College } from '../data-models/colleges';
import { Program } from '../data-models/programs';
import { ProgramService } from '../programs/program.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  studentList: Student[] = [];
  collegeList: College[] = [];
  programList: Program[] = [];

  matchedCollege: College;
  matchedProgram: Program;

  constructor(private studentsDB: StudentService,
              private collegeDB: CollegeService,
              private programsDB: ProgramService,
              private router: Router){}
  ngOnInit() : void {
    this.getStudents();
    this.getColleges();
    this.getPrograms();
  }

  public getStudents() {
    this.studentsDB.getStudents().subscribe({
      next: response => {
        this.studentList = response;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  public viewStudentDetails(studid: number): void {
    this.router.navigate(['/student', studid]);
  }

  public addStudent(): void{
    this.router.navigate(['/add-student']);
  }

  public getCollegeFullName(collid: number): string {
    const matchedCollege = this.collegeList.find(college => college.collid == collid);
    return matchedCollege ? matchedCollege.collfullname : '';
  }

  public getProgramFullName(progid: number): string {
    const matchedProgram = this.programList.find(program => program.progid === progid);
    return matchedProgram ? matchedProgram.progfullname : '';
  }

  public getPrograms(){
    this.programsDB.getPrograms().subscribe({
      next: response => {
        this.programList = response;
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
}
