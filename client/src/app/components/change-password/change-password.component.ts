import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input() public show: boolean;
  private oldPassword: String = '';
  private newPassword: String = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  update() {

    if (this.oldPassword.length === 0 || this.newPassword.length === 0) {
      alert('Please provide all the data!');
      return;
    }

    this.authService.changePassword(this.oldPassword, this.newPassword)
      .subscribe(
        data => {
          alert(data.message);
          if (data.success) {
            location.reload();
          }
        }
      );
  }
}
