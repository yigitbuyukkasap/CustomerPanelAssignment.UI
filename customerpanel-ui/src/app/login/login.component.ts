import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  user = {};
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  submit(): void{
    this.loginService.postLogin(this.form)
    .subscribe(response =>{
      this.router.navigate(['/customers']).then(() => window.location.reload());
    }, err =>{
      this.snackbar.open('Giris Yapilamadi Lutfen Dogru Giriniz. ', undefined, {
        duration: 2000,
        verticalPosition: 'top',
      })
    });
  }

}
