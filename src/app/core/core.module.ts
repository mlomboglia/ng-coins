import { CoinMarketCapService } from './../dashboard/coinmarketcap/coinmarketcap.service';
import { CryptoCompareService } from './../dashboard/cryptocompare/cryptocompare.service';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    ShoppingListService,
    DashboardService,
    DataStorageService,
    AuthService,
    CryptoCompareService,
    CoinMarketCapService
  ]
})
export class CoreModule {}
