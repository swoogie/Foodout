import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { KJUR } from 'jsrsasign';
import { ApiService } from './api.service';
import {
  BehaviorSubject,
  concatMap,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';

const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
  private jwtHelper = new JwtHelperService();

  constructor(
    private storage: Storage,
    private plt: Platform,
    private router: Router,
    private apiService: ApiService
  ) {
    this.storage.create();
    this.loadStoredToken();
  }

  loadStoredToken() {
    let platformObs = from(this.plt.ready());
    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map((token) => {
        if (token) {
          let decoded = this.jwtHelper.decodeToken(token);
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }

  login(email: string, pass: string): Observable<any> {
    return this.apiService.getUserByEmail(email).pipe(
      switchMap((user) => {
        if (user[0].password == pass) {
          const secret = 'kas-skaitys-tas-gaidys';
          const header = { alg: 'HS256', typ: 'JWT' };
          const payload = {
            email: email,
            password: pass,
            iat: Math.floor(Date.now() / 1000),
          };
          const token = KJUR.jws.JWS.sign(null, header, payload, {
            utf8: secret,
          });

          let decoded = this.jwtHelper.decodeToken(token);
          return of(
            this.storage.set(TOKEN_KEY, token),
            this.userData.next(decoded)
          );
        } else {
          return throwError(() => `Invalid email or password`);
        }
      })
    );
  }

  getUser() {
    return this.userData.getValue();
  }

  logout() {
    this.userData.next(null);
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
    });
  }
}
