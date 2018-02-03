import { ICard } from "../cards/card.model";

export class Deck {
  constructor(
    public deckList: Array<ICard>, 
    public cardDeckSize: number, 
    public characterPoints: number, 
    public hasBattlefield: boolean,
    public hasPlot: boolean
  ) {}
}