import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { App } from 'src/app/model/app/app';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AppService {
  endPoint:string = "http://localhost:8080/apps";

  constructor(private httpCliente: HttpClient) { }

  getApps():Observable<App[]>{
      return this.httpCliente.get<App[]>(this.endPoint);
  }
}
