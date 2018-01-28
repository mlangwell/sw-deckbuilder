import { Component, OnInit } from '@angular/core';

import { CardService } from '../card.service';
import { ICard } from '../card.model';

class PrimeNgDropdown {
  constructor(public label: string, public value: string) { }
}

@Component({
  selector: 'sw-card-list',
  templateUrl: 'card-list.component.html'
})
export class CardListComponent implements OnInit {
  cards: Array<ICard>;
  sets: Array<PrimeNgDropdown> = new Array<PrimeNgDropdown>();
  affiliations: Array<PrimeNgDropdown> = new Array<PrimeNgDropdown>();
  types: Array<PrimeNgDropdown> = new Array<PrimeNgDropdown>();
  rarities: Array<PrimeNgDropdown> = new Array<PrimeNgDropdown>();
  selectedSet: string;
  selectedAffiliation: string;
  selectedType: string;
  selectedRarity: string;
  searchTerm: string;

  constructor(
    private _cardService: CardService
  ) { }

  ngOnInit() { 
    this.affiliations.push(new PrimeNgDropdown('All', ''));
    this.affiliations.push(new PrimeNgDropdown('Neutral', 'Neutral'));
    this.affiliations.push(new PrimeNgDropdown('Villain', 'Villain'));
    this.affiliations.push(new PrimeNgDropdown('Hero', 'Hero'));
    this.rarities.push(new PrimeNgDropdown('All', ''));
    this.rarities.push(new PrimeNgDropdown('Starter', 'Starter'));
    this.rarities.push(new PrimeNgDropdown('Common', 'Common'));
    this.rarities.push(new PrimeNgDropdown('Uncommon', 'Uncommon'));
    this.rarities.push(new PrimeNgDropdown('Rare', 'Rare'));
    this.rarities.push(new PrimeNgDropdown('Legendary', 'Legendary'));
    this._cardService.getCardList()
    .subscribe(
      (cardList: Array<ICard>) => this.cards = cardList,
      (err) => console.log(err),
      () => {
        let setNames: Array<string> = new Array<string>();
        let types: Array<string> = new Array<string>();
        this.cards.forEach((card: ICard) => {
          if (setNames.indexOf(card.set_name) < 0) {
            setNames.push(card.set_name);
          }
          if (types.indexOf(card.type_name) < 0) {
            types.push(card.type_name);
          }
        });
        this.sets.push(new PrimeNgDropdown('All', ''));
        this.types.push(new PrimeNgDropdown('All', ''));
        setNames.forEach((setName: string) => this.sets.push(new PrimeNgDropdown(setName, setName)));
        types.forEach((type: string) => this.types.push(new PrimeNgDropdown(type, type)));
      }
    );
  }

  setSet(setName: string) {
    this.selectedSet = setName;
    if (setName === 'Rivals') {
      this.selectedAffiliation = 'Neutral';
      this.selectedRarity = 'Starter';
    } else if (setName === 'Two-Player Game') {
      this.selectedRarity = 'Starter';
    }
  }

  clearFilters() {
    this.selectedSet = null;
    this.selectedAffiliation = null;
    this.selectedRarity = null;
    this.selectedType = null;
    this.searchTerm = null;
  }
}