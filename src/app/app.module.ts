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

@NgModule({
  imports: [
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
    DialogModule
  ],
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    SetFilterPipe,
    AffiliationFilterPipe,
    TypeFilterPipe,
    RarityFilterPipe,
    SearchFilterPipe,
    SidebarCardComponent
  ],
  providers: [
    CardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
