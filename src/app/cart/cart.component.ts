import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { Cart } from '../interfaces/cart';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class CartComponent {
  @Input() cart: Cart[];
  total: number = 0;
  constructor(private cartService: CartService) {}

  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.amount, 0);
  }
  removeCartItem(cart: Cart) {
    this.cartService.removeProduct(cart);
  }
  increaseCartItem(cart: Cart) {
    this.cartService.addProduct(cart);
  }
  decreaseCartItem(cart: Cart) {
    this.cartService.decreaseProduct(cart);
  }
}
