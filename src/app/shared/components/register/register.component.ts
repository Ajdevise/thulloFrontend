import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  showError: boolean = false;
  errorMessage: string;
  registerForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.minLength(4), Validators.maxLength(20), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.maxLength(20), Validators.required])
    })
  }

  register() {
    if(this.registerForm.invalid) {
      return;
    }

    this.showError = false;
    this.loading = true;

    this.authService.register(this.registerForm.value).pipe(finalize(() => {
      this.loading = false;
    })).subscribe(() => {
      console.log("Successfully registered");
      this.router.navigate(["/"]);
    }, (err) => {
      this.showError = true;
      this.errorMessage = err;
      console.log(err);
    });
  }
}
