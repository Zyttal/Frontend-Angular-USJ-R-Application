import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { CollegesComponent } from './colleges/colleges.component';
import { ProgramsComponent } from './programs/programs.component';

import { StudentService } from './students/student.service';
import { CollegeService } from './colleges/college.service';
import { ProgramService } from './programs/program.service';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { AddStudentComponent } from './students/add-student/add-student.component';
import { AddCollegeComponent } from './colleges/add-college/add-college.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CollegeDetailsComponent } from './colleges/college-details/college-details.component';
import { AddProgramComponent } from './programs/add-program/add-program.component';
import { ProgramDetailsComponent } from './programs/program-details/program-details.component';
import { DepartmentDetailsComponent } from './departments/department-details/department-details.component';
import { AddDepartmentComponent } from './departments/add-department/add-department.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsComponent,
    CollegesComponent,
    ProgramsComponent,
    StudentDetailsComponent,
    AddStudentComponent,
    AddCollegeComponent,
    DepartmentsComponent,
    CollegeDetailsComponent,
    AddProgramComponent,
    ProgramDetailsComponent,
    DepartmentDetailsComponent,
    AddDepartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [StudentService, CollegeService, ProgramService],
  bootstrap: [AppComponent]
})

export class AppModule { }
