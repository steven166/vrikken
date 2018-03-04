import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VrikkenService } from "./services/vrikken.service";
import { VrikkenClient } from "./clients/vrikken.client";
import { UserComponent } from './component/user/user.component';
import { JoiningComponent } from './component/joining/joining.component';
import { BiedingComponent } from './component/bieding/bieding.component';
import { SortAndFilterOppositesPipe } from './pipes/sort-and-filter-opposites.pipe';
import { HandComponent } from './component/hand/hand.component';
import { CardComponent } from './component/card/card.component';
import { CounterComponent } from './component/counter/counter.component';
import { PartnerComponent } from './component/partner/partner.component';
import { OppositeComponent } from './component/opposite/opposite.component';
import { ShowingComponent } from "./component/showing/showing.component";
import { ShowCardsFilterPipe } from "./pipes/show-cards-filter.pipe";
import { SortHandPipe } from "./pipes/sort-hand.pipe";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    JoiningComponent,
    BiedingComponent,
    SortAndFilterOppositesPipe,
    ShowCardsFilterPipe,
    SortHandPipe,
    HandComponent,
    CardComponent,
    CounterComponent,
    PartnerComponent,
    OppositeComponent,
    ShowingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    VrikkenClient,
    VrikkenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
