import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// Message Interface
interface Message {
  from: string;
  to: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  public messages: Array<Message> = [];

  // Create connection
  private socket = io(environment.websocket_url);

  constructor() { }

  // Send Message
  sendMessage(msg: Message) {
    this.socket.emit('message', msg);
  }

  // Create an observable that will look for incoming messages
  newMessage() {
    const observable = new Observable<Message>(obs => {
      this.socket.on('message', msg => {
        this.messages.push(msg);
        obs.next(msg);
      });
      return () => this.socket.disconnect();
    });
    return observable;
  }

}
