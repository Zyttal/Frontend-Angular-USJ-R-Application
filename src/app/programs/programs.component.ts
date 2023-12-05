import { ProgramService } from './program.service';
import { Component } from '@angular/core';
import { Program } from '../data-models/programs';
import { CollegeService } from '../colleges/college.service';
import { College } from '../data-models/colleges';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent {
  programList: Program[] = [];
  collegeList: College[] = [];

  constructor(private programsDB:ProgramService,
              private collegeDB:CollegeService,
              private router:Router){}

  ngOnInit(): void{
    this.getPrograms();
    this.getColleges();
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

  public getCollegeFullName(collid: number): string {
    const matchedCollege = this.collegeList.find(college => college.collid == collid);
    return matchedCollege ? matchedCollege.collfullname : '';
  }

  public viewProgramDetails(progid: number): void {
    this.router.navigate(['/program', progid]);
  }

  addProgram() {
    this.router.navigate(['/add-program']);
  }
}
