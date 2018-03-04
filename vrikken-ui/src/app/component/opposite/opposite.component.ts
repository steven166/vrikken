import { Component, Input } from '@angular/core';
import { Room } from "../../models/room";
import { User } from "../../models/user";

@Component({
  selector: 'opposite-component',
  templateUrl: './opposite.component.html',
  styleUrls: ['./opposite.component.css']
})
export class OppositeComponent {

  @Input()
  user:User;
  @Input()
  room:Room;

  getUser():User{
    return this.room.users.filter(u => u.username.toLowerCase() === this.user.username.toLowerCase())[0];
  }

}
