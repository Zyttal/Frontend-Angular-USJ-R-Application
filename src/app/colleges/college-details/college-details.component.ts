import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { College } from 'src/app/data-models/colleges';
import { CollegeService } from '../college.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-college-details',
  templateUrl: './college-details.component.html',
  styleUrls: ['./college-details.component.css']
})
export class CollegeDetailsComponent {
  constructor(private route: ActivatedRoute,
    private collegeDB: CollegeService,
    private formBuilder: FormBuilder,
    private location: Location,
    private notification: SnackbarService){}
  collegeForm: FormGroup;
  college:College;
  collid:number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.collid = +params.get('id');
      this.getCollege(this.collid);
    });

    this.collegeForm = new FormGroup({
      collid: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      collegefullname: new FormControl(null, [Validators.required,  Validators.pattern('^[a-zA-Z]+([- ][a-zA-Z]+)*$')]),
      collegeshortname: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+([- ][a-zA-Z]+)*$')], ),
    })
  }

  private getCollege(collid:number): void{
    this.collegeDB.getCollegeInfo(collid).subscribe({
      next: (data) => {
        this.college = data;
        this.collegeForm = this.formBuilder.group({
          collid: [{value: this.college.collid, disabled: true}, Validators.required],
          collegefullname: [this.college.collfullname, Validators.required],
          collegeshortname: [this.college.collshortname, Validators.required],
        })
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  public goBack(){
    this.location.back();
  }

  public saveModifications(): void{
    if(this.collegeForm.valid){
      const formData = this.collegeForm.value;

      const updatedCollege: College = {
        collfullname: formData.collegefullname,
        collshortname: formData.collegeshortname,
        collid: this.college.collid,
      };

      console.log(updatedCollege);

      this.collegeDB.modifyCollegeDetails(updatedCollege).subscribe({
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
    }else {
      console.error();
    }
  }

  public deleteCollege(collid: number): void{
    this.collegeDB.removeCollege(collid).subscribe({
      next: response => {
        this.notification.openSnackBar(response.status);
      },
      error: error => {
        console.log(error);
      },
      complete: () =>{
        this.goBack();
      }
    })
  }


}
