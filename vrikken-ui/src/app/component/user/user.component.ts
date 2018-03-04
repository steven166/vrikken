import { Component, Input } from '@angular/core';
import { User } from "../../models/user";
import { VrikkenService } from "../../services/vrikken.service";
import { Room } from "../../models/room";
import { RoomStatus } from "../../models/room-status";

@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @Input('user')
  user: User;
  @Input('room')
  room: Room;

  constructor(private vrikkenService:VrikkenService) { }

  public leave(){
     this.vrikkenService.leaveRoom(this.vrikkenService.getRoomNumber());
  }

  public getTurn():boolean{
    if(this.room){
      let user = this.room.users.filter(u => u.username.toLowerCase() === this.user.username.toLowerCase())[0];

      if(user) {
        if ( this.room.status === RoomStatus.SHOWING ) {
          return this.room.playingCamp.users.filter( u => u === user.username ).length > 0
        } else {
          return user.turn;
        }
      }
    }
    return false;
  }

  public getPass():boolean{
    if(this.room){
      let user = this.room.users.filter(u => u.username.toLowerCase() === this.user.username.toLowerCase())[0];
      if(user){
        return user.pass;
      }
    }
    return false;
  }

}
