import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CollegeService } from 'src/app/colleges/college.service';
import { College } from 'src/app/data-models/colleges';
import { Program } from 'src/app/data-models/programs';
import { Student } from 'src/app/data-models/students';
import { ProgramService } from 'src/app/programs/program.service';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  studentForm: FormGroup;
  collegeList: College[] = [];
  programList: Program[] = [];
  filteredPrograms: Program[] = [];

  constructor(private collegeDB: CollegeService,
              private programsDB: ProgramService,
              private studentsDB: StudentService,
              private location: Location,
              private notification: SnackbarService) {
    this.studentForm = new FormGroup({
      studID: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      studFirstName: new FormControl(null, [Validators.required,  Validators.pattern('^[a-zA-Z]+([- ][a-zA-Z]+)*$')]),
      studMidName: new FormControl(null, [Validators.pattern('^[a-zA-Z]+([- ][a-zA-Z]+)*$')], ),
      studLastName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+([- ][a-zA-Z]+)*$')]),
      selectedCollege: new FormControl(null, [Validators.required]),
      selectedProgram: new FormControl(null, [Validators.required]),
      studYear: new FormControl(null, [Validators.required, Validators.pattern('^[1-5]$')]),
    })

    this.getColleges();
    this.getPrograms();
  }

  studID: number = null;
  studFirstName: string = '';
  studLastName: string = '';
  studMidName: string = '';
  studYear: number = null;

  selectedCollege: College = null;
  selectedProgram: Program = null;

  public saveStudentInfo(): void {
    if(this.studentForm.valid){
      const formData = this.studentForm.value;

      const newStudent: Student = {
        studid: parseInt(formData.studID),
        studfirstname: formData.studFirstName,
        studlastname: formData.studLastName,
        studmidname: formData.studMidName,
        studprogid: formData.selectedProgram.progid,
        studcollid: formData.selectedCollege.collid,
        studyear: parseInt(formData.studYear),
      };

      console.log(newStudent);

      this.studentsDB.addStudent(newStudent).subscribe({
        next: response => {
        },
        error: error => {
          console.log(error);
        },
        complete: () =>{
          this.notification.openSnackBar("Student Successfully Added!");
          this.goBack();
        }
      })

    }else{
      this.notification.openSnackBar("Form has Invalid Inputs");
    }
  }

  public goBack(){
    this.location.back();
  }

  public getCollegeFullName(collid: number): string {
    const matchedCollege = this.collegeList.find(college => college.collid == collid);
    return matchedCollege ? matchedCollege.collfullname : '';
  }

  public getFilteredPrograms(): Program[] | null {
    const selectedCollege = this.studentForm.get('selectedCollege').value;
    if (!selectedCollege || !selectedCollege.collid) {
      return null;
    }

    const collegeID = selectedCollege.collid;
    const filteredPrograms = this.programList.filter(program => program.progcollid === collegeID);

    return filteredPrograms;
  }

  private getPrograms(){
    this.programsDB.getPrograms().subscribe({
      next: response => {
        this.programList = response;
      },
      error: error => {
        console.log('Response has Failed.');
        console.log(error);
      }
    })
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
}
