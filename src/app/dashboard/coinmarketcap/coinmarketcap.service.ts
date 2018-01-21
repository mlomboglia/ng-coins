import { Coin } from './coinmarketcap.interfaces';
import { AuthService } from './../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CoinMarketCapService {
    dataEdited = new BehaviorSubject<boolean>(false);
    dataIsLoading = new BehaviorSubject<boolean>(false);
    dataLoadFailed = new Subject<boolean>();
    dataLoaded = new Subject<Coin[]>();
    result: any;

    constructor(private http: Http,
        private authService: AuthService) {
    }

    getCoinList() {
        this.dataLoaded.next(null);
        this.dataLoadFailed.next(false);
        this.http.get('https://api.coinmarketcap.com/v1/ticker/')
            .map(
            (response: Response) => response.json()
            )
            .subscribe(
            (data) => {
                this.dataLoaded.next(data);
                console.log(data);
            },
            (error) => {
                console.log(error);
                this.dataLoadFailed.next(true);
                this.dataLoaded.next(null);
            }
            );
    }
}