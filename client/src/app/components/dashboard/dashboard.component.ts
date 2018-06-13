import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private currentMessage: string;
  private fetchedMessages: Array<Object> = [];

  private username: String;
  private userAvatar: String = 'default';
  private room: String = 'Global';

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.authService.getProfile()
      .subscribe(
        data => {
          // Add this condition when ready to production because of nodemon constant updates
          // if (!data.success) {
          //   alert(data.message);
          //   this.authService.logout();
          //   this.router.navigate(['/home']);
          // }
            this.username = data.user.username;
        },
      );

    this.chatService.newMessage()
      .subscribe(
        data => {
          console.log(data);
          this.fetchedMessages.push(data);
        }
      );
    this.chatService.joinRoom('Global')
      .subscribe(
        data => {
          data.map(element => this.fetchedMessages.push(element));
        }
      );
  }

  send() {
    this.chatService.sendMessage({
      from: localStorage.getItem('user'),
      to: 'global',
      content: this.currentMessage
    });
    this.currentMessage = '';
  }

}
