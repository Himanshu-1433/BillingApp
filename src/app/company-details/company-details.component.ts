import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css'],
})
export class CompanyDetailsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  form !: FormGroup;
  
  ngOnInit(): void {
    this.form = this.fb.group({
      CompanyName: this.fb.control(''),
      GSTNumber: this.fb.control(''),
      Manufacturing: this.fb.control(''),
      address: this.fb.control(''),
      billType: this.fb.control(''),
      mobileNumber: this.fb.array([this.fb.control('')]),
    });
  }

  get mobileNumber() : FormArray {
    return this.form.get('mobileNumber') as FormArray;
  }

  addMobInput() {
    this.mobileNumber.push(this.fb.control(''));
  }

  deleteMobInput(mobIndex: number) {
    this.mobileNumber.removeAt(mobIndex);
  }

  showFormValue() {
    console.log(this.form);
  }
}
