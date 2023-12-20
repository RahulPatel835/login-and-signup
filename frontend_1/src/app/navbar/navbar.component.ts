import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  isLoggedIn=true;
  
  constructor(private authService: AuthService,private router :Router) {
    this.authService.isLoginIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }     
    logout() {
      this.authService.setLoginStatus(false);
      this.authService.logout();
      this.authService.refreshPage();

      console.log("logout");
    
      if (this.router.url === "/attendance-list" || this.router.url === "/attendance-form" || this.router.url === "/student") {
        this.router.navigate(["/login"]);
      } else {
        this.router.navigate(['/']);
      }
    }
              
  
}
