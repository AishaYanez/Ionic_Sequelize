import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AppListComponent } from '../components/app-list/app-list.component';
import { MyAppListComponent } from '../components/my-app-list/my-app-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        component: AppListComponent
      },
      {
        path: 'myApps',
        component: MyAppListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
