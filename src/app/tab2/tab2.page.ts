import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Observable, concatMap, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Order } from '../interfaces/order';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab2Page {
  userId: number;
  loaded: boolean = false;
  total: number;
  noOrders: boolean = true;
  userOrders: any[] = [];
  ionViewWillEnter() {
    this.loaded = false;
    const userEmail = this.auth.getUser().email;
    this.api
      .getUserByEmail(userEmail)
      .pipe(
        concatMap((users) => {
          return this.api.getUserOrders(users[0].id);
        })
      )
      .subscribe((userOrders) => {
        userOrders.forEach((orderList) => {
          this.total = orderList.order.reduce(
            (acc, item) => acc + item.price * item.amount,
            0
          );
          orderList.total = this.total;
        });
        this.userOrders = userOrders;
        this.noOrders = this.userOrders.length < 1;
        this.loaded = true;
      });
  }

  ionViewDidLeave() {
    this.userOrders = null;
  }

  constructor(private api: ApiService, private auth: AuthService) {}

  handleRefresh($event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      $event.target.complete();
    }, 300);
  }
}
