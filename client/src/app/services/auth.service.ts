import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, RequestOptions} from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

interface User {
  email: string;
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = 'http://localhost:8080';
  private user: String;
  private authToken: string;
  private options: RequestOptions;

  constructor(
    private http: Http,
  ) { }

  // Register a user
  registerUser(user: User) {
    return this.http.post(this.domain + '/authentication/register', user)
      .pipe(
        map(res => res.json())
      );
  }

  // Live check if current typed email is valid
  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email)
      .pipe(
        map(res => res.json())
      );
  }
  // Live check if current typed username is valid
  checkUsername(username) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + username)
      .pipe(
        map(res => res.json())
      );
  }

  // Login
  login(user) {
    return this.http.post(this.domain + '/authentication/login', user)
      .pipe(
        map(res => res.json())
      );
  }

  // Store user data in localStorage
  storeUserData(user, token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Load token from localStorage
  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  // Create Authorization header
  createAuthenticationHeader() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    });
  }

  // Get user profile
  getProfile() {
    this.createAuthenticationHeader();
    return this.http.get(this.domain + '/authentication/profile', this.options)
      .pipe(
        map(res => res.json())
      );
  }

  // Logout function
  logout() {
    this.user = null;
    this.authToken = null;
    localStorage.clear();
  }

  // Check whether token expired or not
  checkLogin() {
    return !jwtHelper.isTokenExpired(localStorage.getItem('token')); // true or false
  }

  // Update user profile picture
  updateUserPicture(icon, color) {
    const icons = ['fas fa-user-tie', 'fas fa-user-ninja', 'fas fa-user-secret', 'fas fa-user-md',
    'fas fa-user-astronaut', 'fas fa-user-slash'];
    const colors = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-info'];

    this.createAuthenticationHeader();
    return this.http.put(this.domain + '/authentication/updateAvatar', {
      avatar: icon,
      avatarColor: color
    }, this.options).pipe(
      map(res => res.json())
    );
  }
}
