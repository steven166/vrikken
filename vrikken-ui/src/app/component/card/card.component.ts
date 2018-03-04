import { Component, Input } from '@angular/core';
import { Card } from "../../models/card";
import { CardType } from "../../models/card-types";

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()
  card:Card;
  @Input()
  small:boolean = false;

  constructor() { }

  public isHearts():boolean{
    return this.card.type === CardType.HEARTS;
  }

  public isSpades():boolean{
    return this.card.type === CardType.SPADES;
  }

  public isDiamonds():boolean{
    return this.card.type === CardType.DIAMONDS;
  }

  public isClubs():boolean{
    return this.card.type === CardType.CLUBS;
  }

  public getIndex():string{
    switch (this.card.index){
      case 1: return 'A';
      case 11: return 'J';
      case 12: return 'Q';
      case 13: return 'H';
      default:
        return this.card.index + '';
    }
  }

  public getTypeSrc():string{
    if(this.isHearts()){
      return "/assets/images/hearts-icon.png";
    }
    if(this.isClubs()){
      return "/assets/images/clubs-icon.png";
    }
    if(this.isDiamonds()){
      return "/assets/images/diamonds-icon.png";
    }
    if(this.isSpades()){
      return "/assets/images/spades-icon.png";
    }
    return null;
  }
//
}
