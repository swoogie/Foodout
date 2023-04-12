import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-fabbutton',
  templateUrl: './fabbutton.component.html',
  styleUrls: ['./fabbutton.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class FabbuttonComponent implements OnInit {
  @Input() cartCount: number;
  constructor(private cartService: CartService) {}
  // public cartCount: number;
  ngOnInit() {
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
