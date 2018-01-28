import { Component, OnInit, Input } from '@angular/core';
import { ICard } from '../card.model';
import { CardService } from '../card.service';

@Component({
  selector: 'sw-card',
  templateUrl: 'card.component.html'
})

export class CardComponent implements OnInit {
  @Input() card: ICard;
  cardSelected: boolean = false;

  constructor(private _cardService: CardService) { }

  ngOnInit() { }

  click() {
    console.log(this.card);
    this.cardSelected = !this.cardSelected;
    if (this.cardSelected) {
      this._cardService.addToDeck(this.card);
    } else {
      this._cardService.removeFromDeck(this.card);
    }
  }

  get image(): string {
    return `url(${this.card.imagesrc})`;
  }
}