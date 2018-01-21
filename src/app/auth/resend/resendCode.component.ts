import { AuthService } from './../auth.service';
import { User } from './../../shared/user.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './resendCode.html'
})
export class ResendCodeComponent implements OnInit {
    @ViewChild('usrForm') form: NgForm;
    model: User = new User();
    errorMessage: string;
    didFail = false;
    isLoading = false;

    constructor(private authService: AuthService) {
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
        this.errorMessage = null;
    }

    resendCode() {
        this.errorMessage = null;
        if (this.form.valid) {
            this.authService.resendCode(this.model.email);
            //this.router.navigate(['/confirmRegistration', this.model.email]);
        } else {
            this.errorMessage = "All fields are required";
        }
    }
}