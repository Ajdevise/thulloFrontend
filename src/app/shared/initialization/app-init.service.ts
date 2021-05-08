import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response.model';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  init() {
    return new Promise<void>((resolve, reject) => {
      this.http.get<AuthResponse>("http://localhost:3000/api/users/profile").subscribe((authResponse) => {
        console.log("User authenticated");
        this.authService.setAuthData(authResponse);
        resolve();
      }, (err) => {
        console.log("User not authenticated");
        resolve();
      })
    })
  }
}
