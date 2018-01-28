import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ICard } from './card.model';

const API_URL: string = 'https://swdestinydb.com/api/public/cards/';

@Injectable()
export class CardService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getCardList(): Observable<Array<ICard>> {
    return this._httpClient.get<Array<ICard>>(API_URL);
  }
}