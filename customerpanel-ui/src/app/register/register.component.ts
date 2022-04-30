import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    });
  }
  submit(): void {
    this.registerService
      .postRegister(this.form.getRawValue())
      .subscribe((r) => {
        if (r == 1)
          this.snackbar.open('Basarili Sekilde Uye Olundu', undefined, {
            duration: 2000,
            verticalPosition: 'top',
          });
        this.router.navigate(['/login']);
      }, err =>{
        this.snackbar.open('Uye Olma Basarisiz Tekrar Deneyiniz : Bos Alanlari doldurun Veya Dogru EPosta Adresi Giriniz', undefined, {
          duration: 2000,
          verticalPosition: 'top',
        });
      });
  }
}
