import { Pipe, PipeTransform } from '@angular/core';
import { ICard } from './card.model';

@Pipe({name: 'setFilter'})
export class SetFilterPipe implements PipeTransform {
  transform(cards: Array<ICard>, setName: string): Array<ICard> {
    if (setName) {
      return cards.filter((card: ICard) => card.set_name === setName);
    }
    
    return cards;
  }
}