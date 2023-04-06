import { Routes } from "@angular/router";
import { DetRestaurantPage } from "./det-restaurant/det-restaurant.page";
import { Tab1Page } from "./tab1.page";

export const routes: Routes = [
    {
        path: '',
        component: Tab1Page,
        pathMatch: 'full',
    },
    {
        path: ':id',
        component: DetRestaurantPage
    }
];
