import { Component } from '@angular/core';
import { College } from '../data-models/colleges';
import { CollegeService } from './college.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent {
  collegeList: College[] = [];
  collegeInfo: any;

  constructor(private collegeDB: CollegeService, private router: Router){}

  ngOnInit(): void {
    this.getColleges();
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

  public viewCollegeDetails(collid: number): void {
    this.router.navigate(['/college', collid]);
  }

  addCollege() {
    this.router.navigate(['/add-college']);
  }
}
