import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public message: String;
  public messageClass: String;
  public processing: Boolean = false;
  public emailMessage: String;
  public emailValid: Boolean;
  public usernameValid: Boolean;
  public usernameMessage: String;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
      // Create form invoked
      this.createForm();
  }

  ngOnInit() {
  }

  // Create form
  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        this.validateUsername
      ])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  // Check if an email has a valid form
  validateEmail(controls) {
    // tslint:disable-next-line:max-line-length
    const check = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (check.test(controls.value)) {
      return null;
    }
    return { 'validateEmail': true };
  }
  // Check if an username has a valid form
  validateUsername(controls) {
    if (controls.value.length < 5) {
      return { 'validateUsername': true };
    }
    const check = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
    if (check.test(controls.value)) {
      return null;
    }
    return { 'validateUsername': true};
  }

  onLoginSubmit() {
    this.processing = true;
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    };
    this.authService.login(user).subscribe(data => {

      if (!data.success) {
        alert(data.message);

      } else {
        alert('Logged in!');
        this.authService.storeUserData(data.user, data.token);
        this.router.navigate(['/dashboard']);
      }
      console.log(data);
    });
  }

}
