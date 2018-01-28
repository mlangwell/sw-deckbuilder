import { Pipe, PipeTransform } from '@angular/core';
import { ICard } from './card.model';

@Pipe({name: 'typeFilter'})
export class TypeFilterPipe implements PipeTransform {
  transform(cards: Array<ICard>, type: string): Array<ICard> {
    if (type) {
      return cards.filter((card: ICard) => card.type_name === type);
    }
    
    return cards;
  }
}