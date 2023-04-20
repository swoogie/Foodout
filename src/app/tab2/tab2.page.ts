import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab2Page {
  constructor(private api: ApiService) {
    this.userOrders = this.api.getUserOrders();
  }
  userOrders: Observable<any>;

  ngOnInit() {}

  handleRefresh($event) {
    setTimeout(() => {
      this.userOrders = this.api.getUserOrders();
      $event.target.complete();
    }, 500);
  }
}
