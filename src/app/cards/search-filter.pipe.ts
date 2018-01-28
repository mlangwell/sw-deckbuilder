import { Pipe, PipeTransform } from '@angular/core';
import { ICard } from './card.model';

const RANGED: string = 'ranged';
const MELEE: string = 'melee';
const INDIRECT: string = 'indirect';
const FOCUS: string = 'focus';
const DISRUPT: string = 'disrupt';
const SHIELD: string = 'shield';
const DISCARD: string = 'discard';
const RESOURCE: string = 'resource';
const SPECIAL: string = 'special';
const BLANK: string = 'blank';

const DIE_MAP = new Map([
  [RANGED, 'RD'],
  [MELEE, 'MD'],
  [INDIRECT, 'ID'],
  [FOCUS, 'F'],
  [DISRUPT, 'Dr'],
  [SHIELD, 'Sh'],
  [DISCARD, 'Dc'],
  [RESOURCE, 'R'],
  [SPECIAL, 'Sp'],
  [BLANK, '-']
]);


@Pipe({name: 'searchFilter'})
export class SearchFilterPipe implements PipeTransform {
  transform(cards: Array<ICard>, searchTerm: string): Array<ICard> {
    let returnCards: Array<ICard> = new Array<ICard>();
    if (searchTerm) {
      const SEARCH_TERM: string = searchTerm.toLowerCase();
      let dieSymbol = DIE_MAP.get(searchTerm.toLowerCase());
      cards.forEach((card: ICard) => {
        let sides: string = '';
        if (dieSymbol && card.sides) {
          for (let i = 0; i < card.sides.length; i++) {
            if (card.sides[i].includes(dieSymbol)) {
              sides = searchTerm;
              i = card.sides.length;
            }
          }
        }
        let searchString: string = `${card.name} ${card.text} ${sides}`;
        if (searchString.toLowerCase().includes(SEARCH_TERM)) {
          returnCards.push(card);
        }
      });
    }
    return returnCards.length > 0 ? returnCards : cards;
  }
}