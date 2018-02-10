import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CardService } from './cards/card.service';
import { CardListComponent } from './cards/card-list/card-list.component';
import { CardComponent } from './cards/card/card.component';

import { SetFilterPipe } from './cards/set-filter.pipe';
import { AffiliationFilterPipe } from './cards/affiliations-filter.pipe';
import { TypeFilterPipe } from './cards/type-filter.pipe';
import { RarityFilterPipe } from './cards/rarity-filter.pipe';
import { SearchFilterPipe } from './cards/search-filter.pipe';
import { TopNFilterPipe } from './cards/top-n-filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';
import { DecksComponent } from './decks/decks.component';
import { DeckComponent } from './decks/deck/deck.component';

// PrimeNg
import { CardModule } from 'primeng/components/card/card';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { DataScrollerModule } from 'primeng/components/datascroller/datascroller';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { ToolbarModule } from 'primeng/components/toolbar/toolbar';
import { SidebarModule } from 'primeng/components/sidebar/sidebar';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { SidebarCardComponent } from './cards/sidebar-card/sidebar-card.component';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { ProgressSpinnerModule } from 'primeng/components/progressspinner/progressspinner'
import { ColorFilterPipe } from './cards/color-filter.pipe';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    DropdownModule,
    DataScrollerModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    SidebarModule,
    TooltipModule,
    DialogModule,
    AccordionModule,
    ProgressSpinnerModule
  ],
  declarations: [
    CardsComponent,
    AppComponent,
    CardComponent,
    CardListComponent,
    SetFilterPipe,
    AffiliationFilterPipe,
    TypeFilterPipe,
    RarityFilterPipe,
    SearchFilterPipe,
    TopNFilterPipe,
    ColorFilterPipe,
    SidebarCardComponent,
    HomeComponent,
    DecksComponent,
    DeckComponent
  ],
  providers: [
    CardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
