import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-profile-image',
  templateUrl: './change-profile-image.component.html',
  styleUrls: ['./change-profile-image.component.css']
})
export class ChangeProfileImageComponent implements OnInit {

  constructor() { }

  private color: string;
  private avatar: string;

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

}
