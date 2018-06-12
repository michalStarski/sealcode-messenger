import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private form: FormGroup;
  private message: String;
  private messageClass: String;
  private processing: Boolean = false;
  private emailMessage: String;
  private emailValid: Boolean;
  private usernameValid: Boolean;
  private usernameMessage: String;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    // Create form invoked
    this.createForm();
   }

  // Create form
  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        this.validateUsername
      ])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.validatePasswords('password', 'confirmPassword')});
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

  // Check if password matches
  validatePasswords(password, confirmPassword) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirmPassword].value) {
        return null;
      }
      return { 'validatePasswords': true };
    };
  }

  // Submit the form
  onRegisterSubmit() {
    this.processing = true;
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    };
    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }
      console.log(data);
    });
  }

  checkEmail() {
    this.authService.checkEmail(this.form.get('email').value).subscribe(
      data => {
        if (!data.success) {
          this.emailValid = false;
          this.emailMessage = data.message;
        } else {
          this.emailMessage = data.message,
          this.emailValid = true;
        }
      }
    );
  }

  checkUsername() {
    this.authService.checkUsername(this.form.get('username').value).subscribe(
      data => {
        if (!data.success) {
          this.usernameValid = false;
          this.usernameMessage = data.message;
        } else {
          this.usernameMessage = data.message,
          this.usernameValid = true;
        }
      }
    );
  }

  ngOnInit() {
  }

}
