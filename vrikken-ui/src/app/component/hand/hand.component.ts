import { Component, Input } from '@angular/core';
import { Card } from "../../models/card";

@Component( {
  selector: 'hand-component',
  templateUrl: './hand.component.html',
  styleUrls: [ './hand.component.css' ]
} )
export class HandComponent {

  selectedCard:number;

  @Input()
  cards: Card[];
  @Input()
  selectable:boolean = false;

  constructor() {
  }

  public cardClick( card: Card ) {
    if(this.selectable) {
      let selectedCard = this.cards.indexOf( card );
      if ( selectedCard === this.selectedCard ) {
        this.selectedCard = -1;
      } else {
        this.selectedCard = selectedCard;
      }
    }
  }

  public isSelected(card:Card):boolean{
    return this.cards.indexOf(card) === this.selectedCard;
  }

}
