import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  auth = false;

  constructor(private login: LoginService, private htpp: HttpClient) { }

  ngOnInit(): void {
    this.auth = this.login.IsLoggedIn();
  }

  logOut(): void{
    /*this.htpp.post.
    this.auth = false;*/
  }

}
