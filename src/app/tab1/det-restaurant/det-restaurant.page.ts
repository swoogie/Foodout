import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  IonContent,
  IonList,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { Observable } from 'rxjs';
import { FabbuttonComponent } from '../../fabbutton/fabbutton.component';
import { CartComponent } from '../../cart/cart.component';
import { Food } from 'src/app/interfaces/food';
import { SwiperSlide, SwiperContainer, register } from 'swiper/element/bundle';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

register();

@Component({
  selector: 'app-det-restaurant',
  templateUrl: './det-restaurant.page.html',
  styleUrls: ['./det-restaurant.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FabbuttonComponent,
    CartComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetRestaurantPage implements OnInit, AfterViewInit {
  opts = {
    freeMode: true,
    slidesPerView: 10,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100,
  };
  activeCategory = 0;
  @ViewChildren(IonList, { read: ElementRef }) lists: QueryList<ElementRef>;
  listElements = [];
  @ViewChild(IonContent) content: IonContent;
  categorySlidesVisible = false;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private cartService: CartService,
    private toastController: ToastController
  ) {}
  data$: Observable<Restaurant>;
  food$: Observable<Food[]>;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data$ = this.apiService.getRestaurantById(id);
    this.food$ = this.apiService.getFoodByRestaurantId(id);
  }

  ngAfterViewInit(): void {
    this.lists.changes.subscribe(() => {
      this.listElements = this.lists.toArray();
    });
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top - 150 >= 0 &&
      rect.bottom - 150 <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.categorySlidesVisible = offset > 250;
    const swiperEl: any = document.querySelector('swiper-container');

    for (let i = 0; i < this.listElements.length; i++) {
      const item = this.listElements[i].nativeElement;
      if (this.isElementInViewport(item)) {
        this.activeCategory = i;
        swiperEl.swiper.slideTo(i);
        break;
      }
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  toastButtons = [
    {
      text: 'To main page',
      handler: () => this.router.navigate(['/']),
    },
  ];

  async addItemToCart(meal: Cart) {
    this.cartService.addProduct(meal);
    const toast = await this.toastController.create({
      message: `Added to cart: ${meal.name}`,
      duration: 1000,
      position: 'bottom',
      buttons: this.toastButtons,
    });

    await toast.present();
  }

  selectCategory(index) {
    const child = this.listElements[index].nativeElement;
    this.content.scrollToPoint(0, child.offsetTop - 120, 200);
  }
}
