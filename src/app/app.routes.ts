import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./registration/registration.page').then(
        (m) => m.RegistrationPage
      ),
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
