import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  postRegister(form: FormGroup){
    return this.http.post('api/Auth/Register', form.getRawValue());
  }
}
