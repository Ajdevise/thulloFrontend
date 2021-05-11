import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDropdownActive: boolean = false;
  boardView: boolean = false;
  user: User;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUserData();
    this.toggleBoardView(this.router.url);
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        this.toggleBoardView(e.url);
      }
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  toggleBoardView(url: string) {
    this.boardView = url.includes("board/") ? true : false;
  }

  toggleDropdown() {
    this.isDropdownActive = !this.isDropdownActive;
  }

  deactivateDropdown() {
    this.isDropdownActive = false;
  }
}
