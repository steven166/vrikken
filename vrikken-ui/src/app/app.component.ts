import { Component } from '@angular/core';
import { VrikkenService } from "./services/vrikken.service";
import { User } from "./models/user";
import { Room } from "./models/room";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private user:User;
  private room:Room;

  constructor(private service:VrikkenService){
    this.service.getUser().subscribe(user => this.user = user);
    this.service.getRoom().subscribe(room => this.room = room);
  }

}
