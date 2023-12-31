import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  
  singupForm!: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";
  
  constructor(public formBuilder: FormBuilder,
    private userService: UserService,
    private router:Router
  ) { }


  ionViewWillEnter() {
    this.singupForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.clearForm();
  }

  clearForm(){
    this.singupForm = this.formBuilder.group({
      nickName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get errorControl() {
    return this.singupForm.controls;
  }

  async register() {
    this.isSubmitted = true;
    if (!this.singupForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let blob: any = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      return new Promise<boolean>((resolve) => {
        // console.log(this.singupForm.value);
        this.userService.postUser(this.singupForm.value, blob).subscribe((r) => {
          console.log('Respuesta del servidor:', r);
          resolve(true);
          // this.router.navigateByUrl('/login');
        }, (error) => {
          console.log('Error al realizar la solicitud: ', error);
          resolve(false);
        });
      });
    }
  }
}