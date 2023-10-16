import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { User } from 'src/app/model/user/user';
import { StatusLoginService } from 'src/app/services/statusLogin/status-login.service';
// import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private statusService:StatusLoginService) {}

  ngOnInit() { }

  email: string = 'aisha1@hola.es';
  password: string = 'sfdsf4';

  login() {
    this.statusService.login(this.email,this.password);
  }
}
