import { Component, Input } from '@angular/core';
import { User } from "../../models/user";
import { Room } from "../../models/room";
import { CardType } from "../../models/card-types";
import { Card } from "../../models/card";
import { VrikkenService } from "../../services/vrikken.service";

@Component( {
  selector: 'partner-component',
  templateUrl: './partner.component.html',
  styleUrls: [ './partner.component.css' ]
} )
export class PartnerComponent {

  @Input()
  user: User;
  @Input()
  room: Room;
  types: string[] = [ CardType.CLUBS, CardType.DIAMONDS, CardType.HEARTS, CardType.SPADES ];

  constructor(private vrikkenService:VrikkenService){}

  isTurn():boolean{
    return this.getUser() && this.getUser().turn;
  }

  getUser(): User {
    return this.room.users.filter( u => u.username.toLowerCase() === this.user.username.toLowerCase() )[ 0 ];
  }

  getCards():Card[]{
    let user = this.getUser();
    let index;
    if(user.cards.filter(card => card.index == 1).length < 4){
      // Choose 1
      index = 1;
    }else if(user.cards.filter(card => card.index == 13).length < 4){
      // Choose 13
      index = 13;
    }else{
      index = 12;
    }
    let types = this.types.filter(type => user.cards.filter(card => card.type === type && card.index === index).length === 0);
    return types.map(type => <Card>{type:type,index:index});
  }

  chooseCard(card:Card):void{
    this.vrikkenService.choosePartner(card);
  }
}
