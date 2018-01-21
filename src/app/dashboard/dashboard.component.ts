
import { HttpClient } from '@angular/common/http';
import { CoinListResponse } from './cryptocompare/cryptocompare.interfaces';
import { CryptoCompareService } from './cryptocompare/cryptocompare.service';
import { Coin } from './cryptocompare/cryptocompare.interfaces';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  coinListResponse: CoinListResponse;
  didFail = false;

  constructor(public cryptoCompareService: CryptoCompareService) { }

  ngOnInit() {
    
    this.cryptoCompareService.dataLoaded.subscribe(
      (data: CoinListResponse) => {
        this.coinListResponse = data;
      }
    ); 
    this.cryptoCompareService.dataLoadFailed.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
    
    this.cryptoCompareService.getCoinList();
  }

}

