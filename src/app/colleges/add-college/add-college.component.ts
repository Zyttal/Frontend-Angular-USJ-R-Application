import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CollegeService } from '../college.service';
import { College } from 'src/app/data-models/colleges';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-add-college',
  templateUrl: './add-college.component.html',
  styleUrls: ['./add-college.component.css']
})
export class AddCollegeComponent {
  constructor(private location: Location,
    private collegeDB: CollegeService,
    private notification: SnackbarService){}
  collegeForm: FormGroup;

  ngOnInit(): void {
    this.collegeForm = new FormGroup({
      collid: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      collegefullname: new FormControl(null, [Validators.required,  Validators.pattern('^[a-zA-Z]+([- ][a-zA-Z]+)*$')]),
      collegeshortname: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+([- ][a-zA-Z]+)*$')], ),
    })
  }

  public goBack(){
    this.location.back();
  }

  public saveCollege(): void {
    if(this.collegeForm.valid){
      const formData = this.collegeForm.value;

      const newCollege: College = {
        collid: formData.collid,
        collfullname: formData.collegefullname,
        collshortname: formData.collegeshortname,
      };

      this.collegeDB.addCollege(newCollege).subscribe({
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
    }else{
      this.notification.openSnackBar("This Form has invalid inputs.");
    }
  }
}
