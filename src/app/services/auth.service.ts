import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { KJUR } from 'jsrsasign';
import {
  BehaviorSubject,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
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
    private http: HttpClient,
    private plt: Platform,
    private router: Router
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
        console.log('Token from storage: ', token);
        if (token) {
          let decoded = this.jwtHelper.decodeToken(token);
          console.log('decoded: ', decoded);
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }

  login(email: string, pass: string): Observable<any> {
    return this.http.get('http://localhost:3000/users/0').pipe(
      take(1),
      map((res) => {
        const secret = 'kas-skaitys-tas-gaidys';
        const header = { alg: 'HS256', typ: 'JWT' };
        const payload = {
          email: email,
          password: pass,
          iat: Math.floor(Date.now() / 1000),
        };

        return KJUR.jws.JWS.sign(null, header, payload, { utf8: secret });
      }),
      switchMap((token) => {
        let decoded = this.jwtHelper.decodeToken(token);
        this.userData.next(decoded);

        let storagePromise = new Promise<void>((resolve, reject) => {
          try {
            this.storage.set(TOKEN_KEY, token);
            this.storage.get(TOKEN_KEY).then((storedToken) => {
              resolve(storedToken);
            });
          } catch (error) {
            reject(error);
          }
        });

        let storageObs = from(storagePromise);
        return storageObs;
      })
    );
  }

  getUser() {
    return this.userData.getValue();
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }
}
