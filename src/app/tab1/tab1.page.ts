import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonicModule,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Restaurant } from '../interfaces/restaurant';
import { Observable, tap } from 'rxjs';
import { CartComponent } from '../cart/cart.component';
import { FabbuttonComponent } from '../fabbutton/fabbutton.component';
import { CartService } from '../services/cart.service';
import { Cart } from '../interfaces/cart';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    CartComponent,
    FabbuttonComponent,
  ],
})
export class Tab1Page implements OnInit {
  constructor(
    private apiService: ApiService,
    private renderer: Renderer2,
    private cartService: CartService
  ) {}
  data$!: Observable<Restaurant[]>;
  results: Restaurant[] = [];
  @ViewChild('header') header: HTMLElement;
  @ViewChild('searchbar') searchbar: HTMLElement;
  @ViewChild('infScroll') infScroll: IonInfiniteScroll;
  dataArray: Restaurant[] = [];
  ngOnInit() {
    this.data$ = this.apiService.get2Restaurants(1);
    this.data$.pipe().subscribe((e) => {
      this.dataArray = e;
    });
    this.results = [...this.dataArray];
  }

  filterItemsByTitle(event: Event): void {
    const query = (<HTMLInputElement>event.target).value.toLowerCase();
    this.results = this.dataArray.filter(
      (d) => d.title.toLowerCase().indexOf(query) > -1
    );
  }

  ionViewWillEnter() {
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 100ms');
    this.renderer.setStyle(
      this.searchbar['el'],
      'webkitTransition',
      'top 100ms'
    );
  }

  currposY = 0;
  maxPosY = 0;
  onContentScroll(event) {
    this.currposY = event.detail.scrollTop;
    // console.log(this.posY);
    if (this.maxPosY < this.currposY) {
      this.maxPosY = this.currposY;
      this.renderer.setStyle(this.header['el'], 'top', '-76px');
      this.renderer.setStyle(this.searchbar['el'], 'top', '-60px');
    } else if (this.maxPosY > this.currposY) {
      this.maxPosY = this.currposY;
      this.renderer.setStyle(this.header['el'], 'top', '0px');
      this.renderer.setStyle(this.searchbar['el'], 'top', '0px');
    }
  }

  arrowToggle: boolean = true;
  toggleClicked(): void {
    this.arrowToggle = !this.arrowToggle;
  }

  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.dataArray = this.shuffle(this.dataArray);
      event.target.complete();
    }, 2000);
  }

  smolpage$!: Observable<Restaurant[]>;
  smolpageArr!: Restaurant[];
  pagenum: number = 2;
  isEmpty: boolean;
  loadingComplete: boolean = false;
  async onIonInfinite(ev) {
    this.smolpage$ = this.apiService.get2Restaurants(this.pagenum);
    this.smolpage$
      .pipe(
        tap((arr) => {
          if (arr.length === 0) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
        })
      )
      .subscribe((e) => (this.smolpageArr = e));

    setTimeout(() => {
      if (!this.isEmpty) {
        this.dataArray = [...this.dataArray, ...this.smolpageArr];
        this.pagenum++;
      }
      this.infScroll.disabled = true;
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 300);

    setTimeout(() => {
      if (!this.isEmpty) {
        this.infScroll.disabled = false;
      }
    }, 500);
  }

  getCartCount(): number {
    return this.cartService.getCartItemCount().getValue();
  }

  getCartItems(): Cart[] {
    return this.cartService.getCart();
  }

  // public results = [...this.data];

  // handleChange(event): void {
  //   const query = event.target.value.toLowerCase();
  //   this.results = this.data.filter((d) => d.rest.toLowerCase().indexOf(query) > -1);
  // }
}
