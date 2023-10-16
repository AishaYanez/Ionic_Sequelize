import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() { }
  nickName: string = '';
  codeUser: string = '';
  email: string = '';
  password: string = '';

  register() {
    const user: User = {
      id: 0,
      nickName: `${this.nickName}`,
      codeUser: `${this.nickName}12345`,
      email: `${this.email}`,
      password: `${this.password}`
    };
    this.userService.postUser(user).subscribe((r) => { console.log('Respuesta del servidor:', r); },
      (error) => {console.log('Error al realizar la solicitud: ', error);}
    );
  }
}
