import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions} from '@angular/http';

// Message Interface
interface Message {
  from: string;
  to: string;
  content: string;
  senderAvatar: string;
  senderAvatarColor: string;
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private domain = 'http://localhost:8080';
  private authToken;

  public messages: Array<Message> = [];

  // Create connection
  private socket = io(environment.websocket_url);

  constructor(
    private http: Http
  ) { }

  // Send Message
  sendMessage(msg: Message) {
    console.log(msg);
    this.socket.emit('message', msg);
    this.messages.push(msg);
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

  fetchMessages(roomName: string) {
    const token = localStorage.getItem('token');
    this.authToken = token;
    const options = new RequestOptions({
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    });
    return this.http.get(this.domain + `/authentication/messages/${roomName}`, options);
  }
}

