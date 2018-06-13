import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private currentMessage: string;
  private fetchedMessages: Array<Object> = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.newMessage()
      .subscribe(
        data => {
          console.log(data);
          this.fetchedMessages.push(data);
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
