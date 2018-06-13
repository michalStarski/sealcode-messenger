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
    this.avatar = avatar;
  }

}
