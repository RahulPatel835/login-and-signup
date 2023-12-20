// Your component code
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service'; // Import your AuthService
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private readonly JWT_KEY = 'jwt_token';
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // const token = localStorage.getItem(this.JWT_KEY);
    // if (token) {
    //   this.authService.setLoginStatus(true);
    //   this.router.navigate(['/attendance-list']);
    // }
  }

onSubmit() {
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.authService.setLoginStatus(true);
        this.router.navigate(['/attendance-list']);
      },
      (error) => {
        console.error('Login failed', error);
        if (error instanceof HttpErrorResponse && error.error) {
          this.errorMessage = error.error.error; 
          console.log(this.errorMessage);
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      }
    );
  }
}
}
//   onSubmit() {
//     if (this.loginForm.valid) {
//       const { username, password } = this.loginForm.value;

//       this.authService.login(username, password).subscribe(
//         (response) => {
//           console.log('Login successful', response);
//           this.authService.setLoginStatus(true);
//           this.router.navigate(['/attendance-list']);
//         },
//         (error) => {
//           console.error('Login failed', error);
//         }
//       );
//     }
//   }
// }
