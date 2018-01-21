import { User } from './../../shared/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  didFail = false;
  isLoading = false;
  errorMessage: string;
  model: User = new User();
  @ViewChild('usrForm') form: NgForm;

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

  onRegister() {
    this.errorMessage = null;
    if (this.form.valid) {
      this.authService.register(this.model.username, this.model.email, this.model.password);
    } else {
      this.errorMessage = "All fields are required";
    }
  }
}
