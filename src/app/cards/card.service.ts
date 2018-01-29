import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ICard } from './card.model';

const API_URL: string = 'https://swdestinydb.com/api/public/cards/';

@Injectable()
export class CardService {
  deckList: Array<ICard> = new Array<ICard>();
  private _currentDeckSize: number = 0;
  private _characterPoints: number = 0;

  constructor(
    private _httpClient: HttpClient
  ) { }

  getCardList(): Observable<Array<ICard>> {
    return this._httpClient.get<Array<ICard>>(API_URL);
  }

  addToDeck(card: ICard): boolean {
    if (this._currentDeckSize < 30) {
      let cardIndex = this.deckList.indexOf(card);
      if (cardIndex < 0) {
        card.count++;
        this._currentDeckSize++;
        this.deckList.push(card);
        return true;
      } else {
        this._currentDeckSize++;
        this.deckList[cardIndex].count++;
        return true;
      }
    }

    return false;
  }

  addCharacter(card: ICard): boolean {
    let charPoint: number = 0;
    let cardIndex = this.deckList.indexOf(card);

    if (cardIndex < 0) {
      if (card.is_unique) {
        charPoint = card.points.split('/').map(point => +point)[0];
      } else {
        charPoint = +card.points;
      }

      if (this._characterPoints + charPoint <= 30) {
        this._characterPoints += charPoint;
        card.count++;
        this.deckList.push(card);
        return true;
      }
    } else {
      if (card.is_unique) {
        charPoint = charPoint = card.points.split('/').map(point => +point)[1];
      } else {
        charPoint = +card.points;
      }

      if (this._characterPoints + charPoint <= 30) {
        this._characterPoints += charPoint;
        this.deckList[cardIndex].count++;
        return true;
      }
    }

    return false;
  }

  decreaseCard(card: ICard) {
    let cardIndex = this.deckList.indexOf(card);
    this._currentDeckSize--;
    this.deckList[cardIndex].count--;

    if (this.deckList[cardIndex].count == 0) {
      this.deckList.splice(cardIndex, 1);
    }
  }

  decreaseCharacter(card: ICard) {
    let cardIndex = this.deckList.indexOf(card)
    let charPoint: number = 0;
    if (card.is_unique) {
      charPoint = card.count > 1 ? card.points.split('/').map(point => +point)[1] : card.points.split('/').map(point => +point)[0];
    } else {
      charPoint = +card.points;
    }
    this._characterPoints -= charPoint;
    this.deckList[cardIndex].count--;

    if (this.deckList[cardIndex].count == 0) {
      this.deckList.splice(cardIndex, 1);
    }
  }

  isCardInDeck(card: ICard): boolean {
    return this.deckList.indexOf(card) >= 0;
  }

  get deckSize(): number {
    return this.deckList.length;
  }
}