import { Component, Input } from '@angular/core';
import { User } from "../../models/user";
import { Room } from "../../models/room";
import { VrikkenService } from "../../services/vrikken.service";

@Component({
  selector: 'bieding-component',
  templateUrl: './bieding.component.html',
  styleUrls: ['./bieding.component.css']
})
export class BiedingComponent {

  @Input()
  user:User;
  @Input()
  room:Room;

  constructor(private vrikkenService:VrikkenService) { }

  getUser():User{
    return this.room.users.filter(u => u.username.toLowerCase() === this.user.username.toLowerCase())[0];
  }

  onBied(value:number){
    this.vrikkenService.bied(value);
  }

  onPass(){
    this.vrikkenService.pass();
  }

  getBod(value){
    if(value){
      return parseInt(value) + 10;
    }
    return 250;
  }

}
