import { Component, OnInit, Input } from '@angular/core';
import { ICard } from '../card.model';
import { CardService } from '../card.service';

@Component({
  selector: 'sw-card',
  templateUrl: 'card.component.html'
})

export class CardComponent implements OnInit {
  @Input() card: ICard;
  deckLimitVis: boolean = false;
  charLimitVis: boolean = false;

  constructor(private _cardService: CardService) { }

  ngOnInit() { 
    this.card.count = 0;
  }

  click() {
    if (!this.cardSelected) {
      if (this.card.type_code == 'character') {
        this._cardService.addCharacter(this.card) ? null : this.charLimitVis = true;
      } else {
        this._cardService.addToDeck(this.card) ? null : this.deckLimitVis = true;
      }
    } else {
      if (this.card.type_code == 'character') {
        this._cardService.decreaseCharacter(this.card);
      } else {
        this._cardService.decreaseCard(this.card);
      }
    }
  }

  get image(): string {
    return `url(${this.card.imagesrc})`;
  }

  get cardSelected(): boolean {
    return this._cardService.isCardInDeck(this.card);
  }
}