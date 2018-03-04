import { Pipe, PipeTransform } from '@angular/core';
import { Card } from "../models/card";
import { CardType } from "../models/card-types";

@Pipe({
  name: 'sortHand'
})
export class SortHandPipe implements PipeTransform {

  transform(cards: Card[]): any {
    return cards.sort((a, b) => {
      let aType = this.getTypeSortIndex(a.type);
      let bType = this.getTypeSortIndex(b.type);
      if(aType === bType){
        let aIndex = this.getIndexSortIndex(a.index);
        let bIndex = this.getIndexSortIndex(b.index);
        return aIndex - bIndex;
      }else{
        return aType - bType;
      }
    })
  }

  private getTypeSortIndex(type:string):number{
    switch (type.toLowerCase()){
      case CardType.HEARTS: return 1;
      case CardType.CLUBS: return 2;
      case CardType.DIAMONDS: return 3;
      case CardType.SPADES: return 4;
    }
    return 0;
  }

  private getIndexSortIndex(index:number):number{
    switch (index){
      case 1: return 16
    }
    return index;
  }

}
