import { CoinMarketCapService } from './../coinmarketcap/coinmarketcap.service';
import { CryptoCompareService } from './../cryptocompare/cryptocompare.service';
import { CoinListResponse } from './../cryptocompare/cryptocompare.interfaces';
import { Coin } from './../coinmarketcap/coinmarketcap.interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  coinListResponse: CoinListResponse;
  coins: Coin[];
  didFail = false;

  constructor(public cryptoCompareService: CryptoCompareService, 
    public coinMarketCapService: CoinMarketCapService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.cryptoCompareService.dataLoaded.subscribe(
      (data: CoinListResponse) => {
        this.coinListResponse = data;
      }
    ); 
    this.cryptoCompareService.dataLoadFailed.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
    
    this.coinMarketCapService.dataLoaded.subscribe(
      (data: Coin[]) => {
        this.coins = data;
      }
    ); 
    this.coinMarketCapService.dataLoadFailed.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );

    //this.cryptoCompareService.getCoinList();
    this.coinMarketCapService.getCoinList();

  }

  ngOnDestroy() {
  }

  /*
  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }*/
}
