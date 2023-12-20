import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {
    this.signupForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      username:['', Validators.required],
      password:['', Validators.required],
      conformPassword:['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { firstName, lastName,username, password ,conformPassword } = this.signupForm.value;

     
      this.authService.signup(firstName, lastName,username, password ,conformPassword).subscribe(
        (response) => {
          console.log('Signup successful', response);
          this.authService.setLoginStatus(true);
          this.router.navigate(['/attendance-list']);
         
        },
        (error) => {
          console.error('Signup failed', error);
        
        }
      );
    }
  }
}
