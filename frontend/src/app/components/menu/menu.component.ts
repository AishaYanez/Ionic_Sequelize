import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusLoginService } from 'src/app/services/statusLogin/status-login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private statusService: StatusLoginService) { }
  public statusLogin!: boolean;

  ngOnInit(): void {
    this.statusService.atributoBooleano$.subscribe((e) => {
      this.statusLogin = e;
    })
  }

  navigateToApps() {
    this.router.navigate(['/']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth']);
  }

  navigateToChangePassword() {
    this.router.navigate(['/change-password']);
  }

  navigateToMyApps() {
    this.router.navigate(['/']);
  }

  deleteThisUser() {
    this.userService.getUser(localStorage.getItem('emailUser') ?? '').subscribe((u) => {
      this.userService.deleteUser(u.id).subscribe((r) => {console.log('Respuesta del servidor:', r); },
        (error) => { console.log('Error al realizar la solicitud: ', error); }
      );
      this.statusService.logOut();
      this.router.navigate(['/']);
    }
    );
  }

  logOut() {
    this.statusService.logOut();
  }
}
