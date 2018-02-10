import { Pipe, PipeTransform } from '@angular/core';
import { ICard } from './card.model';

@Pipe({name: 'colorFilter'})
export class ColorFilterPipe implements PipeTransform {
  transform(cards: Array<ICard>, color: string): Array<ICard> {
    if (color) {
      return cards.filter((card: ICard) => card.faction_code === color);
    }
    
    return cards;
  }
}