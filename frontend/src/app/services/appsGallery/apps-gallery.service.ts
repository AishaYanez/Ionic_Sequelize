import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { App } from 'src/app/model/app/app';
import { AppGallery } from 'src/app/model/appGallery/app-gallery';
import { User } from 'src/app/model/user/user';
import { UserService } from '../user/user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsUsingUrlEncoded = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})

export class AppsGalleryService {
  endPoint: string = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  getApps(userId: number): Observable<App[]> {
    return this.httpClient.get<App[]>(`${this.endPoint}user/${userId}/apps`);
  }

  postNewApp(app: App, user:User): Observable<AppGallery> {
    let url = `${this.endPoint}apps_galleries`;

    const body = {
      id: {
        userId: user.id,
        appId: app.id
      },
      user: user,
      app: app,
      favorite: false
    }
    return this.httpClient.post<AppGallery>(url, body, httpOptions);

  }

  putStatusApp(id: number): Observable<AppGallery> {
    let idUser = localStorage.getItem('idUser') ?? '';
    let url = `${this.endPoint}apps_galleries/userId={${idUser}}&appId={${id}}`;
    let bodyEncode = new URLSearchParams();
    bodyEncode.append("idUser", idUser);
    bodyEncode.append("idApp", JSON.stringify(id));
    bodyEncode.append("favorite", 'false');

    const body = bodyEncode.toString();
    return this.httpClient.put<AppGallery>(url, body, httpOptionsUsingUrlEncoded);
  }
}