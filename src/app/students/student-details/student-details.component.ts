import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CollegeService } from 'src/app/colleges/college.service';
import { ProgramService } from 'src/app/programs/program.service';
import { College } from 'src/app/data-models/colleges';
import { Program } from 'src/app/data-models/programs';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/data-models/students';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number;
  student: Student;
  collegeList: College[] = [];
  programList: Program[] = [];
  filteredProgramList: Program[] = [];
  studentCollege: College;
  studentProgram: Program;

    constructor(private collegeDB: CollegeService,
                private programsDB: ProgramService,
                private studentsDB: StudentService,
                private location: Location,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private notification: SnackbarService) {}

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      studid: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      studfirstname: new FormControl(null, [Validators.required,  Validators.pattern('^[a-zA-Z]+([- ][a-zA-Z]+)*$')]),
      studmidname: new FormControl(null, [Validators.pattern('^[a-zA-Z]+([- ][a-zA-Z]+)*$')], ),
      studlastname: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+([- ][a-zA-Z]+)*$')]),
      selectedCollege: new FormControl(null, [Validators.required]),
      selectedProgram: new FormControl(null, [Validators.required]),
      studyear: new FormControl(null, [Validators.required, Validators.pattern('^[1-5]+$')]),
    });

    this.route.paramMap.subscribe(params => {
      this.studentId = +params.get('id');
      this.getStudentDetails(this.studentId);
    });

    this.getColleges();
    this.getPrograms();
  }

  public getStudentDetails(id: number): void {
    this.studentsDB.getStudentInfo(id).subscribe({
      next: response => {
        this.student = response;

        this.studentForm = this.formBuilder.group({
          studid: {value: this.student.studid, disabled: true},
          studfirstname: this.student.studfirstname,
          studlastname: this.student.studlastname,
          studmidname: this.student.studmidname,
          selectedCollege: this.student.studcollid || '',
          selectedProgram: this.student.studprogid || '',
          studyear: this.student.studyear
        });
        console.log(this.studentForm);
        this.filteredProgramList =  this.getFilteredPrograms();
      },
      error: error => {
        console.log(error)
      }
    });
  }

  public getFilteredPrograms(): Program[] | null {
    const selectedCollege = this.studentForm.get('selectedCollege');

    if (!selectedCollege || !selectedCollege.value || !selectedCollege.value.collid) {
      return null;
    }

    const collegeID = selectedCollege.value.collid;
    const filteredPrograms = this.programList.filter(program => program.progcollid === collegeID);

    return filteredPrograms;
  }

  public saveModifications(): void{
    if(this.studentForm.valid){
      const formData = this.studentForm.value;

      console.log(formData);

      const updatedStudent: Student = {
        studfirstname: formData.studfirstname,
        studmidname: formData.studmidname,
        studlastname: formData.studlastname,
        studcollid: formData.selectedCollege,
        studprogid: formData.selectedProgram,
        studyear: formData.studyear,
        studid: this.student.studid,
      };

      console.log(updatedStudent);

      this.studentsDB.modifyStudentDetails(updatedStudent).subscribe({
        next: response => {
          this.notification.openSnackBar(response.status);
          if(response.code == 200)
            this.goBack();
        },
        error: error => {
          console.log(error);
        },
        complete: () => {

        }
      })
    }else {
      console.error();
    }
  }

  public deleteStudent(studentId: number): void {
    this.studentsDB.removeStudent(studentId).subscribe({
      next: response => {
        this.notification.openSnackBar(response.status);
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        this.goBack();
      }
    })
  }

  public goBack(){
    this.location.back();
  }

  private getPrograms(){
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

  public getProgramFullName(progid: number): string {
    const matchedProgram = this.programList.find(program => program.progid === progid);
    return matchedProgram ? matchedProgram.progfullname : '';
  }
}
