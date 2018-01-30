import { Pipe, PipeTransform } from '@angular/core';
import { ICard } from './card.model';

@Pipe({name: 'topNFilter'})
export class TopNFilterPipe implements PipeTransform {
  transform(cards: Array<ICard>, topN: number): Array<ICard> {
    if (topN) {
      return cards.slice(0, topN);
    }
    
    return cards;
  }
}