import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../shared/user.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
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
      this.model.email = params['username'];
    });

    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.authService.authDidFail.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
    this.authService.authErrorMessage.subscribe(
      (errorMessage: string) => this.errorMessage = errorMessage,
    );
    this.authService.authSuccessMessage.subscribe(
      (successMessage: string) => this.successMessage = successMessage
    );
    this.errorMessage = null;
  }

  onLogin() {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.form.valid) {
      this.authService.login(this.model.email, this.model.password);
    } else {
      this.errorMessage = "All fields are required";
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
