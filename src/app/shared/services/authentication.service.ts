import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn: boolean = false;
  private userData: User = null;
  private BASE_URL = "http://localhost:3000/api/users/";

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserData(): User {
    return this.userData;
  }

  register(registerData: Register): Observable<AuthResponse> {
    return this.authenticateUser('', registerData);
  }

  login(loginData: Login): Observable<AuthResponse> {
    return this.authenticateUser('login', loginData);
  }

  private authenticateUser(endpoint: string, data: Login | Register): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.BASE_URL + endpoint, data).pipe(tap((authResponse) => {
      this.setAuthData(authResponse);
    }))
  }

  setAuthData(authResponse: AuthResponse) {
    this.loggedIn = true;
    this.userData = authResponse.user;
    localStorage.setItem("token", authResponse.token);
  }
}

interface Login {
  email: string;
  password: string;
}

interface Register {
  username: string;
  email: string;
  password: string;
}
