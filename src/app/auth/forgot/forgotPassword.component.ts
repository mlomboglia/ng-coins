import { AuthService } from './../auth.service';
import { User } from './../../shared/user.model';
import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './forgotPassword.html'
})
export class ForgotPasswordComponent implements OnInit {
    @ViewChild('usrForm') form: NgForm;
    model: User = new User();
    errorMessage: string;
    successMessage: string;
    didFail = false;
    isLoading = false; 

    constructor(public router: Router,
                public authService: AuthService) {
    }

    ngOnInit() {
        this.authService.authIsLoading.subscribe(
            (isLoading: boolean) => this.isLoading = isLoading
        );
        this.authService.authDidFail.subscribe(
            (didFail: boolean) => this.didFail = didFail
        );
        this.authService.authErrorMessage.subscribe(
            (errorMessage: string) => this.errorMessage = errorMessage
        );
        this.authService.authSuccessMessage.subscribe(
            (successMessage: string) => this.successMessage = successMessage
        );
        this.errorMessage = null;
    }

    onNext() {
        this.errorMessage = null;
        this.successMessage = null;
        if (this.form.valid) {
            this.authService.forgotPassword(this.model.email);
        } else {
            this.errorMessage = "All fields are required";
        }
    }
}


@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './forgotPasswordStep2.html'
})
export class ForgotPassword2Component implements OnInit, OnDestroy {
    @ViewChild('usrForm') form: NgForm;
    model: User = new User();
    errorMessage: string;
    successMessage: string;
    didFail = false;
    isLoading = false;
    private sub: any;

    constructor(public router: Router, public route: ActivatedRoute,
        public authService: AuthService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.model.email = params['email'];

        });
        this.authService.authIsLoading.subscribe(
            (isLoading: boolean) => this.isLoading = isLoading
        );
        this.authService.authDidFail.subscribe(
            (didFail: boolean) => this.didFail = didFail
        );
        this.authService.authErrorMessage.subscribe(
            (errorMessage: string) => this.errorMessage = errorMessage
        );
        this.authService.authSuccessMessage.subscribe(
            (successMessage: string) => this.successMessage = successMessage
        );
        this.errorMessage = null;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    
    onNext() {
        this.errorMessage = null;
        this.successMessage = null;
        if (this.form.valid) {
            this.authService.confirmNewPassword(this.model.email, this.model.verificationCode, this.model.password);
        } else {
            this.errorMessage = "All fields are required";
        }
    }
}