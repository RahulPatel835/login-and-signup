import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService : AuthService ){}
  title = 'frontend_1';
  ngOnInit(): void {
    if (this.authService.isLogin) {
      this.authService.setLoginStatus(true);
    }
  }

}
