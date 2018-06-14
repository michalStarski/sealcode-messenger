import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-profile-image',
  templateUrl: './change-profile-image.component.html',
  styleUrls: ['./change-profile-image.component.css']
})
export class ChangeProfileImageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  private color: string;
  private avatar: string;
  @Input() private show: boolean;

  ngOnInit() {
  }

  setColor(color: string): void {
    this.color = color;
  }

  setAvatar(avatar: string): void {
    switch (avatar) {
      case 'suit':
        this.avatar = 'fas fa-user-tie';
        break;
      case 'ninja':
        this.avatar = 'fas fa-user-ninja';
        break;
      case 'agent':
        this.avatar = 'fas fa-user-secret';
        break;
      case 'medic':
        this.avatar = 'fas fa-user-md';
        break;
      case 'astronaut':
        this.avatar = 'fas fa-user-astronaut';
        break;
      case 'headless':
        this.avatar = 'fas fa-user-slash';
        break;
    }
  }

  // Update profile image and reload the site
  update() {
    this.authService.updateUserPicture(this.avatar, this.color)
      .subscribe(
        response => {
          if (!response.success) {
            alert(response.message);
          } else {
            location.reload();
          }
        }
      );
  }

}
