import { Component, OnInit } from '@angular/core';
import { CardService } from '../../cards/card.service';
import { ICard } from '../../cards/card.model';

@Component({
  selector: 'sw-deck',
  templateUrl: 'deck.component.html'
})

export class DeckComponent implements OnInit {
  currentDeck: Array<ICard>;

  constructor(private _cardService: CardService) { }

  ngOnInit() { 
    this.currentDeck = this._cardService.deckList;
  }

  get characters(): Array<ICard> {
    return this.currentDeck.filter((card: ICard) => card.type_code == 'character');
  }

  get supports(): Array<ICard> {
    return this.currentDeck.filter((card: ICard) => card.type_code == 'support');
  }

  get upgrades(): Array<ICard> {
    return this.currentDeck.filter((card: ICard) => card.type_code == 'upgrade');
  }

  get events(): Array<ICard> {
    return this.currentDeck.filter((card: ICard) => card.type_code == 'event');
  }

  get isDeckEmpty(): boolean {
    return this.currentDeck.length == 0;
  }
}