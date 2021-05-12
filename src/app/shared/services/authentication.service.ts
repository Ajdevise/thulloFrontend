import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userDataSubject = new Subject<User>();
  private loggedIn: boolean = false;
  private userData: User = null;
  private BASE_URL = "http://localhost:3000/api/users/";

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserData(): User {
    return JSON.parse(JSON.stringify(this.userData));
  }

  userDataSub(): Subject<User> {
    return this.userDataSubject;
  }

  register(registerData: Register): Observable<AuthResponse> {
    return this.authenticateUser('', registerData);
  }

  login(loginData: Login): Observable<AuthResponse> {
    return this.authenticateUser('login', loginData);
  }

  logout() {
    localStorage.setItem("token", undefined);
    this.loggedIn = false;
    this.userData = null;
  }

  getUserById(id: string): Observable<{user: User}> {
    return this.http.get<{user: User}>(this.BASE_URL + id);
  }

  editUserProfile(data: {username?: string, email?: string, bio?: string, image?: string}): Observable<{user: User}> {
    return this.http.patch<{user: User}>(this.BASE_URL + this.userData._id + "/edit", data).pipe(tap((res) => {
      this.userData = res.user;
      this.userDataSubject.next(res.user);
    }));
  }

  private authenticateUser(endpoint: string, data: Login | Register): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.BASE_URL + endpoint, data).pipe(tap((authResponse) => {
      this.setAuthData(authResponse);
    }))
  }

  setAuthData(authResponse: AuthResponse) {
    this.loggedIn = true;
    this.userData = authResponse.user;
    this.userDataSubject.next(authResponse.user);
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
