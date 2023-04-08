import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'restaurants',
        loadChildren: () =>
          import('../tab1/tab1.routes').then((m) => m.routes),
      },
      {
        path: 'yourOrders',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'yourProfile',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      // {
      //   path: 'cart',
      //   loadComponent: () => import('../cart/cart.component').then( m => m.CartPage)
      // },
      {
        path: '',
        redirectTo: 'tabs/restaurants',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/restaurants',
    pathMatch: 'full',
  },
];
