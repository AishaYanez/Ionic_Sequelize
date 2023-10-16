import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(private userService: UserService) { }
  password!: string;

  ngOnInit() {
  }

  changePassword(){
    this.userService.getUser(localStorage.getItem('emailUser')??'').subscribe((u) => {
      this.userService.updateUser(this.password, u).subscribe((r) => { console.log('Respuesta del servidor:', r); },
      (error) => {console.log('Error al realizar la solicitud: ', error);})
    }
    );
  }

}
