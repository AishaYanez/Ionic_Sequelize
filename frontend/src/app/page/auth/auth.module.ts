import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthPageRoutingModule } from './auth-routing.module';
import { AuthPage } from './auth.page';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user/user.service';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,    
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [AuthPage, LoginComponent, RegisterComponent],
  providers: [UserService]
})
export class AuthPageModule {}
