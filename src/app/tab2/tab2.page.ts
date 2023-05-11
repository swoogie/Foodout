import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab2Page {
  userId: number;

  ionViewWillEnter() {
    const userEmail = this.auth.getUser().email;
    this.api.getUserByEmail(userEmail).subscribe((users) => {
      this.userId = users[0].id;
      this.userOrders = this.api.getUserOrders(users[0].id);
    });
  }

  constructor(private api: ApiService, private auth: AuthService) {}
  userOrders: Observable<any>;

  ngOnInit() {}

  handleRefresh($event) {
    setTimeout(() => {
      this.userOrders = this.api.getUserOrders(this.userId);
      $event.target.complete();
    }, 500);
  }
}
