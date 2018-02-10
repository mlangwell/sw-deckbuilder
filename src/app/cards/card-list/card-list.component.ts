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
  isLoading: boolean;
  cards: Array<ICard>;
  sets: Array<PrimeNgDropdown> = new Array<PrimeNgDropdown>();
  affiliations: Array<PrimeNgDropdown> = new Array<PrimeNgDropdown>();
  types: Array<PrimeNgDropdown> = new Array<PrimeNgDropdown>();
  rarities: Array<PrimeNgDropdown> = new Array<PrimeNgDropdown>();
  colors: Array<PrimeNgDropdown> = new Array<PrimeNgDropdown>();
  selectedSet: string;
  selectedAffiliation: string;
  selectedType: string;
  selectedRarity: string;
  selectedColor: string;
  searchTerm: string;

  topN: number;

  constructor(
    private _cardService: CardService
  ) { }

  ngOnInit() { 
    this.isLoading = true;
    this._cardService.getCardList()
    .subscribe(
      (cardList: Array<ICard>) => this.cards = cardList,
      (err) => console.log(err),
      () => {
        this.topN = 20;
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
        this.colors.push(new PrimeNgDropdown('Red', 'red'));
        this.colors.push(new PrimeNgDropdown('Blue', 'blue'));
        this.colors.push(new PrimeNgDropdown('Yellow', 'yellow'));
        this.colors.push(new PrimeNgDropdown('Gray', 'gray'));
        this.isLoading = false;
      }
    );
  }

  increaseTopN() {
    this.topN += 20;
  }

  setSet(setName: string) {
    this.selectedSet = setName;
    this.topN = 20;
    if (setName === 'Rivals') {
      this.selectedAffiliation = 'Neutral';
      this.selectedRarity = 'Starter';
    } else if (setName === 'Two-Player Game') {
      this.selectedRarity = 'Starter';
    }
  }

  setAffiliation(affiliation: string) {
    this.selectedAffiliation = affiliation;
    this.topN = 20;
  }

  setType(type: string) {
    this.selectedType = type;
    this.topN = 20;
  }

  setRarity(rarity: string) {
    this.selectedRarity = rarity;
    this.topN = 20;
  }

  setColor(color: string) {
    this.selectedColor = color;
    this.topN = 20;
  }

  clearFilters() {
    this.selectedSet = null;
    this.selectedAffiliation = null;
    this.selectedRarity = null;
    this.selectedType = null;
    this.searchTerm = null;
  }
}