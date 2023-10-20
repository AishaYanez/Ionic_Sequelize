import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user/user';
import { StatusLoginService } from 'src/app/services/statusLogin/status-login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  updateForm!: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";
  
  constructor(public formBuilder: FormBuilder,
    private userService: UserService,
    private statusService: StatusLoginService) {
      // this.updateForm = this.formBuilder.group({
      //   password: ['', [Validators.required]]
      // });
    }
    

  ionViewWillEnter() {
    this.updateForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
    this.clearForm();
  }

  ngOnInit() {
    this.clearForm();
  }

  clearForm() {
    this.statusService.userLogin$.subscribe((user:User)=>{
      this.updateForm = this.formBuilder.group({
        password: [user.password, Validators.required]
      });
    })
  }


  async changeUser() {
    let blob: any = null;
    this.isSubmitted = true;
    if (!this.updateForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }
    }
console.log('dsfjfffffffffffffffffffffffffffff');

    return new Promise<boolean>(() => {
      this.userService.getUser(localStorage.getItem('email') ?? '').subscribe(r => {
        console.log(r);
        
        this.userService.updateUser('dsfdsf', blob, r).subscribe(
          (u) => {
            console.log(r);
            console.log(u);
            
            console.log('Respuesta del servidor:', u);
          }, (error) => {
            console.log('Error al realizar la solicitud: ', error);
          }
        );
      }, (error) => {
        console.log('Error al realizar la solicitud: ', error);
      });
    })
  }
}
