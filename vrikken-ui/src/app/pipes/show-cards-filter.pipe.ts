import { Pipe, PipeTransform } from '@angular/core';
import { Card } from "../models/card";

@Pipe({
  name: 'showCardsFilter'
})
export class ShowCardsFilterPipe implements PipeTransform {

  transform(cards: Card[], hideSecond): any {
    return cards.filter(c => c.roem || (c.roemSec && !hideSecond))
  }

}
