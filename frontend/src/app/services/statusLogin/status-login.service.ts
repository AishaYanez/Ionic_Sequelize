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

  public statusLogin = new BehaviorSubject<boolean>(false);
  atributoBooleano$: Observable<boolean> = this.statusLogin.asObservable();

  changeStatusLogin() {
    if (localStorage.getItem('email')) {
      localStorage.setItem('loggedIn', 'true');
      this.statusLogin.next(JSON.parse(localStorage.getItem('loggedIn') ?? 'false'));
    } else {
      localStorage.setItem('loggedIn', 'false');
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
    // this.userService.getUser(email).subscribe((u: User) => {
    //   if (u.password === password) {
    //     localStorage.setItem('loggedIn', 'true');
    //     this.userLogin = {
    //       id: u.id,
    //       codeUser: u.codeUser,
    //       nickName: u.nickName,
    //       email: u.email,
    //       password: u.password
    //     };
    //     localStorage.setItem('emailUser',this.userLogin.email);
    //     this.userService.setUserLogin(this.userLogin);
    //     this.changeStatusLogin();
    //     this.router.navigate(['/']);
    //   }
    // });
  }
}