import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastController: ToastController
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.user.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/tabs/login'], {
            queryParams: { route: route.data['route'] },
          });
          this.presentToast();
          return false;
        } else {
          return true;
        }
      })
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please sign in first 🤔',
      duration: 1000,
      position: 'bottom',
    });

    await toast.present();
  }
}
