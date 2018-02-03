import { Component, HostListener } from '@angular/core';
import { CardsComponent } from './cards/cards.component';
import { CardService } from './cards/card.service';
import { HomeComponent } from './home/home.component';
import { ICard } from './cards/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scrolled: boolean = false;
  isSidebarVis: boolean = false;
  isBottomSidebarVis: boolean = true;
  isHome: boolean = false;
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

  toggleSidebar() {
    this.isSidebarVis = !this.isSidebarVis;
  }

  checkComponent(event) {
    event.constructor === HomeComponent ? this.isHome = true : this.isHome = false;
  }

  get deckSize(): number {
    return this._cardService.deckSize;
  }

  get cardDeckSize(): number {
    return this._cardService.cardDeckSize;
  }

  get selectedCharacters(): Array<ICard> {
    return this._cardService.deckSize > 0 && this._cardService.hasCharacters ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'character') : null;
  }

  get selectedUpgrades(): Array<ICard> {
    return this._cardService.deckSize > 0 && this._cardService.hasUpgrades ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'upgrade') : null;
  }

  get selectedSupports(): Array<ICard> {
    return this._cardService.deckSize > 0 && this._cardService.hasSupports ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'support') : null;
  }

  get selectedEvents(): Array<ICard> {
    return this._cardService.deckSize > 0 && this._cardService.hasEvents ? this._cardService.deckList.filter((card: ICard) => card.type_code == 'event') : null;
  }

  get plot(): ICard {
    return this._cardService.currentDeck.hasPlot ? this._cardService.deckList.find((card: ICard) => card.type_code == 'plot') : null;
  }

  get battlefield(): ICard {
    return this._cardService.currentDeck.hasBattlefield ? this._cardService.deckList.find((card: ICard) => card.type_code == 'battlefield') : null;
  }

  addCharacter(event: {cardName: string, vis: boolean}) {
    this.charAddedVis = event.vis;
    this.tryAddCard = event.cardName;
  }

  addCard(event: {cardName: string, vis: boolean}) {
    this.deckAddedVis = event.vis;
    this.tryAddCard = event.cardName;
  }

  saveDeck() {
    this._cardService.saveDeck();
  }

  clearDeck() {
    this._cardService.clearDeck();
  }
}
