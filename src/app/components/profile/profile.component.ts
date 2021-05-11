import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  fetchedUser: User;

  constructor(private authService: AuthenticationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentUser = this.authService.getUserData();
    this.activatedRoute.paramMap.subscribe(map => {
      const id = map.get('id');

      this.authService.getUserById(id).subscribe((res: {user: User}) => {
        this.fetchedUser = res.user;
      }, err => {
        // Redirect to ** route
      })
    })
  }

  isOwner(): boolean {
    return this.currentUser._id === this.fetchedUser._id;
  }
}
