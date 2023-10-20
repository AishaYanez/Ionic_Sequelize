import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from 'src/app/model/user/user';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusLoginService {

  constructor(private userService: UserService, private router: Router) { }

  userLogin!:User;

  public statusLogin = new BehaviorSubject<boolean>(false);
  atributoBooleano$: Observable<boolean> = this.statusLogin.asObservable();

  changeStatusLogin() {
    if (localStorage.getItem('email')) {
      localStorage.setItem('loggedIn', 'true');
      this.statusLogin.next(JSON.parse(localStorage.getItem('loggedIn') ?? 'false'));
    } else {
      localStorage.setItem('loggedIn', 'false');
      this.statusLogin.next(JSON.parse(localStorage.getItem('loggedIn') ?? 'false'));
    }
  }

  logOut() {
    localStorage.removeItem('email');
    this.changeStatusLogin();
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }


  login(email: string, password: string) {
    localStorage.setItem('email', email);
    this.changeStatusLogin();
    this.router.navigate(['change-password']);
    this.userService.getUser(email).subscribe((r) => {
      if (r.password === password) {
        localStorage.setItem('loggedIn', 'true');
        this.userLogin = {
          id: r.id,
          codeUser: r.codeUser,
          nickName: r.nickName,
          email: r.email,
          password: r.password
        };
        // this.userService.setUserLogin(this.userLogin);
        this.changeStatusLogin();
        this.router.navigate(['/']);
      }
      console.log('Respuesta del servidor:', r);
      localStorage.setItem('loggedIn', 'true');
      this.router.navigateByUrl('/change-password');
    }, (error) => {
      console.log('Error al realizar la solicitud: ', error);
    });
  }
}