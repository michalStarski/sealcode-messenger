import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BackdropComponent } from '../backdrop/backdrop.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  private username: String;
  private email: String;
  private avatar: String;
  private avatarColor: String;

  @Input() private showBackdrop: Boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(
      profile => {
        this.username = profile.user.username;
        this.email = profile.user.email;
        this.avatar = profile.user.avatar;
        this.avatarColor = profile.user.avatarColor;
      },
      err => { console.log(err); }
    );
  }

  changeProfileImage() {
    this.showBackdrop = true;
  }

  hideBackdrop() {
    this.showBackdrop = false;
  }
}
