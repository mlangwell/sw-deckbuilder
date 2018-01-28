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

  get selectedCharacters(): Array<string> {
    return this._cardService.deckList.length > 0 ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'character').map((card: ICard) => card.name) : null;
  }

  get selectedUpgrades(): Array<string> {
    return this._cardService.deckList.length > 0 ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'upgrade').map((card: ICard) => card.name) : null;
  }

  get selectedSupports(): Array<string> {
    return this._cardService.deckList.length > 0 ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'support').map((card: ICard) => card.name) : null;
  }

  get selectedEvents(): Array<string> {
    return this._cardService.deckList.length > 0 ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'event').map((card: ICard) => card.name) : null;
  }
}
