import { Component, OnInit } from '@angular/core';
import { App } from 'src/app/model/app/app';
import { User } from 'src/app/model/user/user';
import { AppsGalleryService } from 'src/app/services/appsGallery/apps-gallery.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-my-app-list',
  templateUrl: './my-app-list.component.html',
  styleUrls: ['./my-app-list.component.scss'],
})
export class MyAppListComponent  implements OnInit {
  public apps: Array<App> = [];
  constructor( private appsGaService:AppsGalleryService, private userService:UserService) { }

  ngOnInit() {
    this.userService.getUser(localStorage.getItem('emailUser')??'').subscribe((u)=>{
      this.appsGaService.getApps(u.id).subscribe((apps: Array<App>) => {
        this.apps = apps;
      });
    })
  }
}
