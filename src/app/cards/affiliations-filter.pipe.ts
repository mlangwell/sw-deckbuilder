import { Pipe, PipeTransform } from '@angular/core';
import { ICard } from './card.model';

@Pipe({name: 'affiliationFilter'})
export class AffiliationFilterPipe implements PipeTransform {
  transform(cards: Array<ICard>, affiliation: string): Array<ICard> {
    if (affiliation) {
      return cards.filter((card: ICard) => card.affiliation_name === affiliation);
    }
    
    return cards;
  }
}