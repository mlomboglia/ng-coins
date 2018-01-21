import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResendCodeComponent } from 'app/auth/resend/resendCode.component';
import { ForgotPasswordComponent, ForgotPassword2Component } from './forgot/forgotPassword.component';
import { ConfirmRegistrationComponent } from './confirm/confirmRegistration.component';

const authRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resendCode', component: ResendCodeComponent },
  { path: 'confirmRegistration/:username', component: ConfirmRegistrationComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'forgotPassword/:email', component: ForgotPassword2Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
