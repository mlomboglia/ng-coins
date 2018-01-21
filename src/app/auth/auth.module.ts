import { ForgotPasswordComponent, ForgotPassword2Component } from './forgot/forgotPassword.component';
import { EqualValidator } from './../shared/equal-validator.directive';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ResendCodeComponent } from 'app/auth/resend/resendCode.component';
import { ConfirmRegistrationComponent } from './confirm/confirmRegistration.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResendCodeComponent,
    ConfirmRegistrationComponent,
    ForgotPasswordComponent,
    ForgotPassword2Component,
    EqualValidator
  ],
  imports: [
    SharedModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
