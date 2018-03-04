import { Component, Input } from '@angular/core';
import { Room } from "../../models/room";
import { User } from "../../models/user";
import { VrikkenService } from "../../services/vrikken.service";

@Component({
  selector: 'showing-component',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.css']
})
export class ShowingComponent {

  @Input()
  user:User;
  @Input()
  room:Room;

  constructor(private vrikkenService:VrikkenService){

  }

  getUser():User{
    return this.room.users.filter(u => u.username.toLowerCase() === this.user.username.toLowerCase())[0];
  }

  isInPlayingCamp(user:User):boolean{
    return this.room.playingCamp.users.filter(u => u === user.username).length > 0
  }

  getPlayingUser():User{
    let playingUsername = this.room.playingCamp.playingUser;
    let user = this.room.users.filter(u => u.username === playingUsername)[0];
    return user;
  }

  getPartner():User{
    let partnerUsername = this.room.playingCamp.users.filter(username => username !== this.room.playingCamp.playingUser)[0];
    let user = this.room.users.filter(u => u.username === partnerUsername)[0];
    return user;
  }

  start():void{
    this.vrikkenService.startGame();
  }

}
