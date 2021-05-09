import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string;
  showError: boolean = false;
  loginForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required])
    })
  }

  login() {
    if(this.loginForm.invalid) {
      return;
    }

    this.showError = false;
    this.loading = true;
    
    this.authService.login(this.loginForm.value).pipe(finalize(() => {
      this.loading = false;
    })).subscribe(() => {
      console.log("Logged In!");
      this.router.navigate(["/"]);
    }, (err) => {
      this.errorMessage = err.error.message;
      this.showError = true;
      console.log(err);
    })
  }
}
