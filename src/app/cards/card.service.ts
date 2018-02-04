import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ICard } from './card.model';
import { Deck } from '../decks/deck.model';

const API_URL: string = 'https://swdestinydb.com/api/public/cards/';

@Injectable()
export class CardService {
  currentDeck: Deck;

  constructor(private _httpClient: HttpClient) { 
    const DECK: Deck = this.getDeck();
    DECK ? this.currentDeck = DECK : this.currentDeck = new Deck(new Array<ICard>(), 0, 0, false, false);
  }

  getCardList(): Observable<Array<ICard>> {
    return this._httpClient.get<Array<ICard>>(API_URL);
  }

  addToDeck(card: ICard): boolean {
    if (this.cardDeckSize < 30) {
      let cardIndex = this.currentDeck.deckList.map((card: ICard) => card.name).indexOf(card.name);
      if (cardIndex < 0) {
        card.count++;
        this.currentDeck.cardDeckSize++;
        this.currentDeck.deckList.push(card);
        return true;
      } else {
        this.currentDeck.cardDeckSize++;
        this.currentDeck.deckList[cardIndex].count++;
        return true;
      }
    }

    return false;
  }

  addCharacter(card: ICard): boolean {
    let charPoint: number = 0;
    let cardIndex = this.currentDeck.deckList.map((card: ICard) => card.name).indexOf(card.name);

    if (cardIndex < 0) {
      if (card.is_unique) {
        charPoint = card.points.split('/').map(point => +point)[0];
      } else {
        charPoint = +card.points;
      }

      if (this.characterPoints + charPoint <= 30) {
        this.characterPoints += charPoint;
        card.count++;
        this.currentDeck.deckList.push(card);
        return true;
      }
    } else {
      if (card.is_unique) {
        charPoint = charPoint = card.points.split('/').map(point => +point)[1];
      } else {
        charPoint = +card.points;
      }

      if (this.characterPoints + charPoint <= 30) {
        this.characterPoints += charPoint;
        this.currentDeck.deckList[cardIndex].count++;
        return true;
      }
    }

    return false;
  }

  addBattlefield(card: ICard): boolean {
    if (!this.currentDeck.hasBattlefield) {
      this.currentDeck.hasBattlefield = true;
      card.count++;
      this.currentDeck.deckList.push(card);
      return true;
    }

    return false;
  }

  addPlot(card: ICard): boolean {
    if (!this.currentDeck.hasPlot && this.characterPoints + +card.points <= 30) {
      this.currentDeck.hasPlot = true;
      this.currentDeck.characterPoints += +card.points;
      card.count++;
      this.currentDeck.deckList.push(card);
      return true;
    }

    return false;
  }

  decreaseCard(card: ICard) {
    let cardIndex = this.currentDeck.deckList.map((card: ICard) => card.name).indexOf(card.name);
    this.cardDeckSize--;
    this.currentDeck.deckList[cardIndex].count--;

    if (this.currentDeck.deckList[cardIndex].count == 0) {
      this.currentDeck.deckList.splice(cardIndex, 1);
    }
  }

  decreaseCharacter(card: ICard) {
    let cardIndex = this.currentDeck.deckList.map((card: ICard) => card.name).indexOf(card.name);
    let charPoint: number = 0;
    if (card.is_unique) {
      charPoint = card.count > 1 ? card.points.split('/').map(point => +point)[1] : card.points.split('/').map(point => +point)[0];
    } else {
      charPoint = +card.points;
    }
    this.characterPoints -= charPoint;
    this.currentDeck.deckList[cardIndex].count--;

    if (this.currentDeck.deckList[cardIndex].count <= 0) {
      this.currentDeck.deckList.splice(cardIndex, 1);
    }
  }

  decreaseBattlefield(card: ICard) {
    let cardIndex = this.currentDeck.deckList.map((card: ICard) => card.name).indexOf(card.name);
    this.currentDeck.deckList[cardIndex].count = 0;
    this.currentDeck.deckList.splice(cardIndex, 1);
    this.currentDeck.hasBattlefield = false;
  }

  decreasePlot(card: ICard) {
    let cardIndex = this.currentDeck.deckList.map((card: ICard) => card.name).indexOf(card.name);
    this.currentDeck.deckList[cardIndex].count = 0;
    this.currentDeck.deckList.splice(this.currentDeck.deckList.indexOf(card), 1);
    this.currentDeck.hasPlot = false;
    this.currentDeck.characterPoints -= +card.points;
  }

  isCardInDeck(card: ICard): boolean {
    return this.currentDeck.deckList.find((deckCard: ICard) => deckCard.name == card.name) != null;
  }

  removeHeroes() {
    this.currentDeck.deckList = this.currentDeck.deckList.filter((card: ICard) => card.affiliation_name == 'Villain');
  }

  removeVillains() {
    this.currentDeck.deckList = this.currentDeck.deckList.filter((card: ICard) => card.affiliation_name == 'Hero');
  }


  saveDeck() {
    localStorage.setItem('currentDeck', JSON.stringify(this.currentDeck));
  }

  private getDeck(): Deck {
    return <Deck>JSON.parse(localStorage.getItem('currentDeck'));
  }

  clearDeck() {
    this.currentDeck = new Deck(new Array<ICard>(), 0, 0, false, false);
    localStorage.removeItem('currentDeck');
  }

  get deckSize(): number {
    return this.currentDeck.deckList.length;
  }

  get cardDeckSize(): number {
    return this.currentDeck.cardDeckSize;
  }

  set cardDeckSize(value: number) {
    this.currentDeck.cardDeckSize = value;
  }

  get characterPoints(): number {
    return this.currentDeck.characterPoints;
  }

  set characterPoints(value: number) {
    this.currentDeck.characterPoints = value;
  }

  get deckList(): Array<ICard> {
    return this.currentDeck.deckList;
  }

  get hasCharacters(): boolean {
    return this.currentDeck.deckList.map((card: ICard) => card.type_code).indexOf('character') >= 0;
  }

  get hasUpgrades(): boolean {
    return this.currentDeck.deckList.map((card: ICard) => card.type_code).indexOf('upgrade') >= 0;
  }

  get hasEvents(): boolean {
    return this.currentDeck.deckList.map((card: ICard) => card.type_code).indexOf('event') >= 0;
  }

  get hasSupports(): boolean {
    return this.currentDeck.deckList.map((card: ICard) => card.type_code).indexOf('support') >= 0;
  }

  get hasVillains(): boolean {
    return this.currentDeck.deckList.map((card: ICard) => card.affiliation_code).indexOf('villain') >= 0;
  }

  get hasHeros(): boolean {
    return this.currentDeck.deckList.map((card: ICard) => card.affiliation_code).indexOf('hero') >= 0;
  }
}