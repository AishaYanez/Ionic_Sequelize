import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';

import { HomePageRoutingModule } from './home-routing.module';
import { AppService } from '../services/app/app.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppListComponent } from '../components/app-list/app-list.component';
import { MyAppListComponent } from '../components/my-app-list/my-app-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [HomePage, AppListComponent, MyAppListComponent],
  providers:[AppService]
})
export class HomePageModule {}
