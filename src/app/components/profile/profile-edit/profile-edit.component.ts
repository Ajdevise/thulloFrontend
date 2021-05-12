import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  loading: boolean = false;
  showError: boolean = false;
  editProfileForm: FormGroup;
  user: User;
  file: File;
  

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUserData();
    console.log("User", this.user);
    this.editProfileForm = new FormGroup({
      image: new FormControl(''),
      username: new FormControl('', [Validators.minLength(4), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.email]),
      bio: new FormControl('')
    })
  }

  filePreview(fileInputElement: HTMLInputElement) {
    this.file = fileInputElement.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.user.image = reader.result.toString();
    }
    reader.readAsDataURL(this.file);
  }

  editProfile() {
    if(this.file) this.editProfileForm.value["image"] = this.user.image;
    this.showError = false;
    if(this.isFormEmpty()) {
      this.showError = true;
      return;
    }

    this.loading = true;
    this.authService.editUserProfile(this.editProfileForm.value).pipe(finalize(() => {
      this.loading = false;
    })).subscribe((res: {user: User}) => {
      this.router.navigate(['/users', `${res.user._id}`]);
    }, err => {
      console.log(err);
    })
  }

  isFormEmpty() {
    let empty = true;
    for(const key in this.editProfileForm.value) {
      if(this.editProfileForm.value[key]) {
        empty = false;
      }
    }

    return empty;
  }
}
