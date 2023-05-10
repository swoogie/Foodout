import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPage } from './login/login.page';
import { RegistrationPage } from './registration/registration.page';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout/checkout.page').then((m) => m.CheckoutPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'success',
    loadComponent: () =>
      import('./success/success.page').then((m) => m.SuccessPage),
  },
];
