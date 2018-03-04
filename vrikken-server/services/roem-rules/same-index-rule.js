/**
 * Rule for same indexes
 *
 * Spade 9, Hearth 9, Diamond 9          = 100
 * Spade 9, Hearth 9, Diamond 9, Clubs 9 = 200
 */
class SameIndexRule{

  calcRoem(cards){
    // Collect cards per index
    let indexes = {};
    cards.forEach(card => {
      if(!indexes[card.index]){
        indexes[card.index] = [card];
      }else{
        indexes[card.index].push(card);
      }
    });

    // Find indexes which have a size of 3 or 4
    let roem = 0;
    for(let index in indexes){
      let iCards = indexes[index];
      if(iCards.length >= 3) {
        iCards.forEach(card => card.roemSec = true);
        if (iCards.length == 4) {
          roem += 200;
        } else if (iCards.length == 3) {
          roem += 100;
        }
      }
    }
    return roem;
  }

}

module.exports.SameIndexRule = SameIndexRule;