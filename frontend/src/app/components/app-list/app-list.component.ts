import { Component, OnInit } from '@angular/core';
import { App } from 'src/app/model/app/app';
import { AppService } from 'src/app/services/app/app.service';
import { AppsGalleryService } from 'src/app/services/appsGallery/apps-gallery.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss'],
})
export class AppListComponent implements OnInit {
  public apps: Array<App> = [];

  constructor(private appService: AppService, private appGaService: AppsGalleryService, private userService: UserService) { }

  ngOnInit(): void {
    this.appService.getApps().subscribe((apps: Array<App>) => {
      this.apps = apps;
    });
  }

  buyApp(app: App) {
    this.userService.getUser(localStorage.getItem('emailUser') ?? '').subscribe((u) => {
      this.appGaService.postNewApp(app, u).subscribe((r) => { console.log('Respuesta del servidor:', r); },
        (error) => { console.log('Error al realizar la solicitud: ', error); })
    }
    );
  }
}
