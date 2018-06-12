import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
    console.log(this.form);
  }

  ngOnInit() {
  }

}
