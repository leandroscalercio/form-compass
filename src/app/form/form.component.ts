import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(public fb: FormBuilder, public router: Router) {}

  get nameControl() {
    return this.formGroup.controls['name'];
  }
  get emailControl() {
    return this.formGroup.controls['email'];
  }
  get phoneControl() {
    return this.formGroup.controls['phone'];
  }
  get passwordControl() {
    return this.formGroup.controls['password'];
  }
  get birthdayControl() {
    return this.formGroup.controls['birthday'];
  }
  get checkboxControl() {
    return this.formGroup.controls['checkbox'];
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      checkbox: ['', [Validators.requiredTrue]],
    });
    const dados = JSON.parse(localStorage.getItem('dados') as string);
    this.formGroup.patchValue({ ...dados });
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.router.navigateByUrl('success');
      localStorage.setItem(
        'dados',
        JSON.stringify(this.formGroup.getRawValue())
      );
    }
  }
}
