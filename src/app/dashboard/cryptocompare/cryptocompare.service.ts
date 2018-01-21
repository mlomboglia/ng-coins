import { AuthService } from './../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { CoinListResponse } from './cryptocompare.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CryptoCompareService {
    dataEdited = new BehaviorSubject<boolean>(false);
    dataIsLoading = new BehaviorSubject<boolean>(false);
    dataLoadFailed = new Subject<boolean>();
    dataLoaded = new Subject<CoinListResponse>();
    result: any;

    constructor(private http: Http,
        private authService: AuthService) {
    }

    getCoinList() {
        this.dataLoaded.next(null);
        this.dataLoadFailed.next(false);
        this.http.get('https://min-api.cryptocompare.com/data/all/coinlist')
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

    /*
    getCoinList() {
        this.http.get<CoinListResponse>('https://min-api.cryptocompare.com/data/all/coinlist')
            .subscribe(
            data => {
                this.coinListResponse.next(data);
                console.log(data);
            },
            err => {
                console.log(err.message);
            }
            );
    }*/

    /*
    getCoinList(): Promise<CoinListResponse> {
        return this.http.get('https://min-api.cryptocompare.com/data/all/coinlist')
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }*/
}