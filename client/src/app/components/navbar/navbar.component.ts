import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(this.isLoggedIn());
  }

  // Log user out and navigate him to the homepage
  onLogoutClick() {
    this.authService.logout();
    alert('Logged out!');
    this.router.navigate(['/home']);
  }

  // Check whether token expired or not
  isLoggedIn() {
    return this.authService.checkLogin();
  }
}
