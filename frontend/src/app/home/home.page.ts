import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app/app.service';
import { App } from '../model/app/app';
import { Router } from '@angular/router';
import { StatusLoginService } from '../services/statusLogin/status-login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public apps: Array<App> = [];
  public myApp!: App;

  constructor(private router: Router, private appService:AppService,private statusService:StatusLoginService) { }
  ngOnInit(): void {
    // this.appService.getApps().subscribe((a: Array<App>) => {
    //   this.apps = a;
    // });
  }

  ionViewWillEnter(): void {
    this.statusService.changeStatusLogin();
  }
}
