import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusLoginService } from './services/statusLogin/status-login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private statusService:StatusLoginService) { }

  ngOnInit(): void {
    this.statusService.changeStatusLogin();
  }
}
