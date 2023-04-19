import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private alertCtrl: AlertController) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user.pipe(
      take(1),
      map(user => {
        console.log('in can activate ', user);
        if (!user) {
          this.alertCtrl.create({
            header: 'Unauthorizes',
            message: 'You are not allowed to access that page.',
            buttons: ['OK']
          }).then(alert => alert.present());
          return false;
        } else {
          return true;
        }
      })
    )
  }

}
