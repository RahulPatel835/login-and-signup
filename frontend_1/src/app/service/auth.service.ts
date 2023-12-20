import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoginIn = this.isLoginSubject.asObservable();
  private readonly JWT_KEY = 'jwt_token';
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {
    
    this.setLoginStatus(this.hasToken());
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.JWT_KEY);
  }

  get isLogin(): boolean {
    return this.isLoginSubject.value;
  }

  setLoginStatus(status: boolean): void {
    this.isLoginSubject.next(status);
  }

  private saveToken(token: string): void {
    console.log('Saving token:', token); 
    localStorage.setItem(this.JWT_KEY, token);
  }



  signup(firstName: string, lastName: string, username: string, password: string, conformPassword: string) {
    return this.http.post(`${this.apiUrl}/signup`, { firstName, lastName, username, password, conformPassword });
  }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError('Login failed');
      }),
      map((response: any) => {
        console.log('Login response:', response);
  
        const token = response?.token; // Use optional chaining to avoid errors if 'token' is undefined
  
        if (token) {
          console.log('Received token:', token);
          this.saveToken(token);
          this.setLoginStatus(true);
        }
  
        return response;
      })
    );
  }
  

  clearToken() {
    if (localStorage.getItem('jwt_token')) {
      localStorage.removeItem('jwt_token');
    }
  }

  refreshPage() {
    window.location.reload();
  }
  logout() {
  this.clearToken();
  this.setLoginStatus(false);
    this.http.post('/api/logout', {})
    .subscribe(() => {
      console.log('Logout successful');
      this.refreshPage();
    });
  
  }
  
 
  
}
