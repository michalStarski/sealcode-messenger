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

    // Fetch room messages from server
    this.chatService.fetchMessages('global').subscribe(
      data => {
        data.json().map(msg => this.fetchedMessages.push(msg));
      }
    );

    // Subscribe to changes
      this.chatService.newMessage()
      .subscribe(
        data => {
          console.log(data);
          this.fetchedMessages.push(data);
        }
      );
  }

  // Send a new message
  send() {

    // Prevent from sending empty messages
    if (this.currentMessage.length === 0) {
      return;
    }

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
