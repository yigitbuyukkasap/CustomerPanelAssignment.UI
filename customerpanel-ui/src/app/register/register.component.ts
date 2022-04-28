import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router)
    { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    });
  }
  submit(): void{
    this.registerService
      .postRegister(this.form.getRawValue())
      .subscribe(r => {
        if(r == 1)
          this.router.navigate(['/login']);
      });
  }
}
