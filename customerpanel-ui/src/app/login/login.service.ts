import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  postLogin(form: FormGroup){
    return this.http.post(
      '/api/Auth/Login',
      form.getRawValue(),
      {responseType: 'text'})
      .pipe(
        tap(r => localStorage.setItem('customerpanel_ui',r.toString()))
      );
  }

  IsLoggedIn(){
    return !!localStorage.getItem('customerpanel_ui');
  }
  

}
