import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUserData();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
