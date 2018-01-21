import { User } from './../shared/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js';

const POOL_DATA = {
  UserPoolId: environment.userPoolId,
  ClientId: environment.clientId
};
const userPool = new CognitoUserPool(POOL_DATA);

@Injectable()
export class AuthService {
  authIsLoading = new BehaviorSubject<boolean>(false);
  authDidFail = new BehaviorSubject<boolean>(false);
  authErrorMessage = new BehaviorSubject<string>("");
  authSuccessMessage = new BehaviorSubject<string>("");
  authStatusChanged = new Subject<boolean>();
  registeredUser: CognitoUser;
  user: User;

  constructor(private router: Router) {
  }

  register(username: string, email: string, password: string): void {
    this.authIsLoading.next(true);
    const attrList: CognitoUserAttribute[] = [];
    const emailAttribute = {
      Name: 'email',
      Value: email
    };
    const nicknameAttribute = {
      Name: 'nickname',
      Value: username
    };
    attrList.push(new CognitoUserAttribute(emailAttribute));
    attrList.push(new CognitoUserAttribute(nicknameAttribute));

    userPool.signUp(email, password, attrList, null, (err, result) => {
      if (err) {
        this.authDidFail.next(true);
        this.authIsLoading.next(false);
        this.authErrorMessage.next(err.message);
        return;
      }
      this.authDidFail.next(false);
      this.authIsLoading.next(false);
      this.registeredUser = result.user;
      this.authSuccessMessage.next("User created, please check your email and confirm registration code.");
      this.router.navigate(['confirmRegistration', result.user.getUsername()]);
      console.log(result);
    });
    return;
  }

  confirmUser(username: string, code: string) {
    console.log(username + " " + code);
    this.authIsLoading.next(true);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        this.authDidFail.next(true);
        this.authIsLoading.next(false);
        return;
      }
      this.authDidFail.next(false);
      this.authIsLoading.next(false);
      this.authSuccessMessage.next("User confirmed successfully, please login.");
      this.router.navigate(['/']);
    });
  }

  login(username: string, password: string): void {
    this.authIsLoading.next(true);
    const authData = {
      Username: username,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result: CognitoUserSession) {
        that.authStatusChanged.next(true);
        that.authDidFail.next(false);
        that.authIsLoading.next(false);
        console.log(result);
      },
      onFailure(err) {
        that.authDidFail.next(true);
        that.authIsLoading.next(false);
        that.authErrorMessage.next(err.message);
        console.log(err);
      }
    });
    return;
  }

  resendCode(username: string) {
    this.authIsLoading.next(true);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        this.authDidFail.next(true);
        this.authIsLoading.next(false);
        this.authErrorMessage.next(err.message);
        return;
      }
      this.authDidFail.next(false);
      this.authIsLoading.next(false);
      this.authSuccessMessage.next("Please check your email and confirm registration code.");
      this.router.navigate(['confirmRegistration', username]);
    });
  }

  forgotPassword(username: string) {
    this.authIsLoading.next(true);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;
    cognitoUser.forgotPassword({
      onSuccess: function (data) {
        that.authDidFail.next(false);
        that.authIsLoading.next(false);
        that.authSuccessMessage.next("Please check your email, confirm registration code and new password.");
        that.router.navigate(['forgotPassword', username]);
        console.log(data);
      },
      onFailure: function (err) {
        that.authDidFail.next(true);
        that.authIsLoading.next(false);
        that.authErrorMessage.next(err.message);
        console.log(err);
      }
    });
  }

  confirmNewPassword(email: string, verificationCode: string, password: string) {
    this.authIsLoading.next(true);
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;
    cognitoUser.confirmPassword(verificationCode, password, {
        onSuccess: function () {
          that.authDidFail.next(false);
          that.authIsLoading.next(false);
          that.authSuccessMessage.next("New password confirmed, please login.");
          that.router.navigate(['/login'], { queryParams: { username: email } });
        },
        onFailure: function (err) {
          that.authDidFail.next(true);
          that.authIsLoading.next(false);
          that.authErrorMessage.next(err.message);
          console.log(err);
        }
    });
}

  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  logout() {
    this.getAuthenticatedUser().signOut();
    this.authStatusChanged.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    console.log(user);
    const obs = Observable.create((observer) => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(false);
          } else {
            if (session.isValid()) {
              observer.next(true);
            } else {
              observer.next(false);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }

  initAuth() {
    this.isAuthenticated().subscribe(
      (auth) => this.authStatusChanged.next(auth)
    );
  }
}
