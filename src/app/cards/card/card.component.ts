import { Component, OnInit, Input } from '@angular/core';
import { ICard } from '../card.model';

@Component({
  selector: 'sw-card',
  templateUrl: 'card.component.html'
})

export class CardComponent implements OnInit {
  @Input() card: ICard;
  cardSelected: boolean = false;

  constructor() { }

  ngOnInit() { }

  click() {
    this.cardSelected = !this.cardSelected;
    console.log('here:', this.card);
  }

  get image(): string {
    return `url(${this.card.imagesrc})`;
  }
}