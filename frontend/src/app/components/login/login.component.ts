import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { User } from 'src/app/model/user/user';
import { StatusLoginService } from 'src/app/services/statusLogin/status-login.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private statusService: StatusLoginService
  ) { }


  ionViewWillEnter() {
    this.loginForm.reset();
    this.isSubmitted = false;
  }

  ngOnInit() {
    this.clearForm();
  }

  clearForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  login() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    }
    return new Promise<boolean>((resolve) => {
      // console.log(this.singupForm.value);
      this.userService.getUser(this.loginForm.value.email).subscribe((r) => {
        console.log('Respuesta del servidor:', r);
        resolve(true);
        this.statusService.login(this.loginForm.value.email, this.loginForm.value.password);
        this.router.navigateByUrl('/change-password');
      }, (error) => {
        console.log('Error al realizar la solicitud: ', error);
        resolve(false);
      });
    });
  }
}
