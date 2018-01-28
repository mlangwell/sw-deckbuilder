import { Pipe, PipeTransform } from '@angular/core';
import { ICard } from './card.model';

@Pipe({name: 'rarityFilter'})
export class RarityFilterPipe implements PipeTransform {
  transform(cards: Array<ICard>, rarity: string): Array<ICard> {
    if (rarity) {
      return cards.filter((card: ICard) => card.rarity_name === rarity);
    }
    
    return cards;
  }
}