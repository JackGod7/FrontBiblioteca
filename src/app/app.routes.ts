import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'loan-request',
    pathMatch: 'full',
  },
  {
    path: 'loan-request',
    loadComponent: () =>
      import('./customer/loan-registration/page/loan-request/loan-request.component').then(
        (m) => m.LoanRequestComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./customer/loan-registration/page/login/login.component').then(
        (m) => m.LoginComponent
      ),
  }
];
