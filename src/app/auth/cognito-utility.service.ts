import { environment } from './../../environments/environment.prod';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export const POOL_DATA = {
    UserPoolId: environment.userPoolId,
    ClientId: environment.clientId
};

@Injectable()
export class CognitoUtilityService {
    
    getUserPool() {
        return new CognitoUserPool(POOL_DATA);
    }

    getCurrentUser(): CognitoUser | null {
        return this.getUserPool().getCurrentUser();
    }

    getAccessToken$(): Observable<{ accessToken: string }> {
        const currentUser = this.getCurrentUser();
        return Observable.create((observer: Observer<{ accessToken: string }>) => {
            if (currentUser === null) {
                observer.error(new Error('CognitoUser cannot be null.'));
                return;
            }

            currentUser.getSession((err, session) => {
                if (err) {
                    observer.error(err);
                    return;
                }

                if (!session.isValid()) {
                    observer.error(new Error(`Session is invalid`));
                    return;
                }

                observer.next({ accessToken: session.getAccessToken().getJwtToken() });
                observer.complete();
            });
        });
    }

    getIdToken$(): Observable<{ idToken: string }> {
        const currentUser = this.getCurrentUser();
        return Observable.create((observer: Observer<{ idToken: string }>) => {
            if (currentUser === null) {
                observer.error(new Error('CognitoUser cannot be null.'));
                return;
            }

            currentUser.getSession((err, session) => {
                if (err) {
                    observer.error(err);
                    return;
                }

                if (!session.isValid()) {
                    observer.error(new Error(`Session is invalid`));
                    return;
                }

                observer.next({ idToken: session.getIdToken().getJwtToken() });
                observer.complete();
            });
        });
    }

    getRefreshToken$(): Observable<{ refreshToken: string }> {
        const currentUser = this.getCurrentUser();
        return Observable.create((observer: Observer<{ refreshToken: string }>) => {
            if (currentUser === null) {
                observer.error(new Error('CognitoUser cannot be null.'));
                return;
            }

            currentUser.getSession((err, session) => {
                if (err) {
                    observer.error(err);
                    return;
                }

                if (!session.isValid()) {
                    observer.error(new Error(`Session is invalid`));
                }

                observer.next({ refreshToken: session.getRefreshToken() });
                observer.complete();
            });
        });
    }
}