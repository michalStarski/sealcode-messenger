import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, RequestOptions} from '@angular/http';

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
  private authToken: String;

  constructor(
    private http: Http
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
}
