import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsUsingUrlEncoded = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endPoint: string = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) { }

  getUser(email: String): Observable<User> {
    let url = `${this.endPoint}?email=${email}`;
    return this.httpClient.get<User>(url);
  }

  postUser(user: User): Observable<User> {
    let bodyEncode = new URLSearchParams();
    bodyEncode.append("nickName", user.nickName);
    bodyEncode.append("codeUser", user.codeUser);
    bodyEncode.append("email", user.email);
    bodyEncode.append("password", user.password);

    const body = bodyEncode.toString();
    console.log(body);
    return this.httpClient.post<User>(this.endPoint, body, httpOptionsUsingUrlEncoded);
  }

  deleteUser(id:number): Observable<User> {
    let url = `${this.endPoint}?id=${id}`;
    return this.httpClient.delete<User>(url);
  }

  updateUser(password: string, user:User): Observable<User> {
    
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("nickName", user.nickName);
    bodyEncoded.append("codeUser", user.codeUser);
    bodyEncoded.append("email", user.email);
    bodyEncoded.append("password", password);
    let body = bodyEncoded.toString();
    let url = `${this.endPoint}/${user.id}`;
    return this.httpClient.put<User>(url, body, httpOptionsUsingUrlEncoded);
  }
}