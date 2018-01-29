import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICard } from '../card.model';
import { CardService } from '../card.service';

@Component({
  selector: 'sidebar-card',
  templateUrl: 'sidebar-card.component.html'
})

export class SidebarCardComponent implements OnInit {
  @Input() card: ICard
  @Output() charAddedVis = new EventEmitter<{ cardName: string, vis: boolean }>();
  @Output() deckAddedVis = new EventEmitter<{ cardName: string, vis: boolean }>();
  constructor(private _cardService: CardService) { }

  ngOnInit() { }

  removeCard() {
    if (this.card.type_code == 'character') {
      this._cardService.decreaseCharacter(this.card);
    } else {
      this._cardService.decreaseCard(this.card);
    }
  }

  addCard() {
    if (this.card.type_code == 'character') {
      if (this.card.is_unique && this.card.count < 2) {
        this._cardService.addCharacter(this.card) ? this.charAddedVis.emit({ cardName: this.card.name, vis: false }) : this.charAddedVis.emit({ cardName: this.card.name, vis: true });
      } else {
        this._cardService.addCharacter(this.card) ? this.charAddedVis.emit({ cardName: this.card.name, vis: false }) : this.charAddedVis.emit({ cardName: this.card.name, vis: true });
      }
    } else if (this.card.type_code != 'character' && this.card.count < 2) {
      this._cardService.addToDeck(this.card) ? this.deckAddedVis.emit({ cardName: this.card.name, vis: false }) : this.deckAddedVis.emit({ cardName: this.card.name, vis: true });
    }
  }
}