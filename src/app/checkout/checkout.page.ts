import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { Cart } from '../interfaces/cart';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CheckoutPage implements OnInit {
  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private router: Router
  ) {}
  cart: Cart[];

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.amount, 0);
  }

  postOrder() {
    this.apiService.postOrder(this.cart).subscribe(
      (response) => {
        this.router.navigate(['/success']);
      },
      (error) => {
        console.error('Server error:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
