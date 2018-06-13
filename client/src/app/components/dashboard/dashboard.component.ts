import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private currentMessage: string;
  private fetchedMessages: Array<Object> = [];

  private username: string;
  private userAvatar: string;
  private userAvatarColor: string;
  private room: String = 'Global';

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile()
      .subscribe(
        data => {
          console.log(data);
          // Add this condition when ready to production because of nodemon constant updates
          // if (!data.success) {
          //   alert(data.message);
          //   this.authService.logout();
          //   this.router.navigate(['/home']);
          // }
            this.username = data.user.username;
            this.userAvatar = data.user.avatar;
            this.userAvatarColor = data.user.avatarColor;
        },
      );

    // Fetch messages and push them into local array
      this.chatService.newMessage()
      .subscribe(
        data => {
          console.log(data);
          this.fetchedMessages.push(data);
        }
      );

    // On connection join room 'Global'
    this.chatService.joinRoom('Global')
      .subscribe(
        data => {
          data.map(element => this.fetchedMessages.push(element));
        }
      );
  }

  send() {
    this.chatService.sendMessage({
      from: this.username,
      to: 'global',
      content: this.currentMessage,
      senderAvatar: this.userAvatar,
      senderAvatarColor: this.userAvatarColor
    });
    this.currentMessage = '';
  }

}
