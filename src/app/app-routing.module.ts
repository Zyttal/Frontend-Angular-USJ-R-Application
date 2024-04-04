import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { CollegesComponent } from './colleges/colleges.component';
import { ProgramsComponent } from './programs/programs.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { AddStudentComponent } from './students/add-student/add-student.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AddCollegeComponent } from './colleges/add-college/add-college.component';
import { CollegeDetailsComponent } from './colleges/college-details/college-details.component';
import { ProgramDetailsComponent } from './programs/program-details/program-details.component';
import { AddProgramComponent } from './programs/add-program/add-program.component';
import { AddDepartmentComponent } from './departments/add-department/add-department.component';
import { DepartmentDetailsComponent } from './departments/department-details/department-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'students', component: StudentsComponent},
    {path: 'student/:id', component: StudentDetailsComponent},
    {path: 'add-student', component: AddStudentComponent},
  {path: 'colleges', component: CollegesComponent},
    {path: 'add-college', component: AddCollegeComponent},
    {path: 'college/:id', component: CollegeDetailsComponent},
  {path: 'programs', component: ProgramsComponent},
    {path: 'program/:id', component: ProgramDetailsComponent},
    {path: 'add-program', component: AddProgramComponent},
  {path: 'departments', component: DepartmentsComponent},
    {path: 'add-department', component: AddDepartmentComponent},
    {path: 'department/:id', component: DepartmentDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
