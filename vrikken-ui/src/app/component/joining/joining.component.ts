import { Component, Input } from '@angular/core';
import { Room } from "../../models/room";
import { VrikkenService } from "../../services/vrikken.service";

@Component({
  selector: 'joining-component',
  templateUrl: './joining.component.html',
  styleUrls: ['./joining.component.css']
})
export class JoiningComponent {

  @Input()
  room:Room;

  constructor(private vrikkenService:VrikkenService) { }

  public startRoom(){
    console.info("stdart", this.vrikkenService);
    this.vrikkenService.startRoom();
  }
}
