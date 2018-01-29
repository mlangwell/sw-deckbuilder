import { Component, HostListener } from '@angular/core';
import { CardService } from './cards/card.service';
import { ICard } from './cards/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scrolled: boolean = false;
  isDeckVis: boolean = false;
  charAddedVis: boolean = false;
  deckAddedVis: boolean = false;
  tryAddCard: string;

  constructor(private _cardService: CardService) {}

  gotoTop() {
    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll')
  scrollWindow() {
    if (window.pageYOffset >= 1500 && !this.scrolled) {
      this.scrolled = true;
    } else if (window.pageYOffset < 1500 && this.scrolled) {
      this.scrolled = false;
    }
  } 

  toggleDeckSide() {
    this.isDeckVis = true;
  }

  get deckSize(): number {
    return this._cardService.deckSize;
  }

  get selectedCharacters(): Array<ICard> {
    return this._cardService.deckSize > 0 ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'character') : null;
  }

  get selectedUpgrades(): Array<ICard> {
    return this._cardService.deckSize > 0 ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'upgrade') : null;
  }

  get selectedSupports(): Array<ICard> {
    return this._cardService.deckSize > 0 ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'support') : null;
  }

  get selectedEvents(): Array<ICard> {
    return this._cardService.deckSize > 0 ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'event') : null;
  }

  addCharacter(event: {cardName: string, vis: boolean}) {
    this.charAddedVis = event.vis;
    this.tryAddCard = event.cardName;
  }

  addCard(event: {cardName: string, vis: boolean}) {
    this.deckAddedVis = event.vis;
    this.tryAddCard = event.cardName;
  }
}
