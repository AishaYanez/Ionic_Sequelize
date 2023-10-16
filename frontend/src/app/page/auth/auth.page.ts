import { Component, OnInit } from '@angular/core';
import { StatusLoginService } from 'src/app/services/statusLogin/status-login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private statusService:StatusLoginService) { }
  status:boolean = true;
  ngOnInit() {
  }
  
  ionViewWillEnter(): void {
    this.statusService.changeStatusLogin();
  }

  switchToLogin(){
    this.status = true;
  }

  switchToRegister(){
    this.status = false;
  }
}
