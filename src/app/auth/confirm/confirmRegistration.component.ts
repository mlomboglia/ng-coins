import { AuthService } from './../auth.service';
import { User } from './../../shared/user.model';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './confirmRegistration.html'
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy {
    @ViewChild('usrForm') form: NgForm;
    model: User = new User();
    errorMessage: string;
    successMessage: string;
    didFail = false;
    isLoading = false;
    private sub: any;

    constructor(public router: Router, public route: ActivatedRoute,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.model.username = params['username'];
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

    onConfirmRegistration() {
        this.errorMessage = null;
        if (this.form.valid) {
            this.authService.confirmUser(this.model.username, this.model.verificationCode);
        } else {
            this.errorMessage = "All fields are required";
        }
    }
}





