import {
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
import { IonicModule, IonContent, IonList, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { Observable } from 'rxjs';
import { FabbuttonComponent } from '../../fabbutton/fabbutton.component';
import { CartComponent } from '../../cart/cart.component';
import { Food } from 'src/app/interfaces/food';
import { register } from 'swiper/element/bundle';
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
export class DetRestaurantPage implements OnInit {
  opts = {
    freeMode: true,
    slidesPerView: 2.6,
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
  ) {}
  data$: Observable<Restaurant>;
  food$: Observable<Food[]>;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data$ = this.apiService.getRestaurantById(id);
    this.food$ = this.apiService.getFoodByRestaurantId(id);
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.categorySlidesVisible = offset > 500;

    for (let i = 0; i < this.listElements.length; i++) {
      const item = this.listElements[i].nativeElement;
      if (this.isElementInViewport(item)) {
        this.activeCategory = i;
        break;
      }
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  public alertButtons = [
    {
      text: 'Continue',
    },
    {
      text: 'To main page',
      handler: () => this.router.navigate(['/']),
    }
  ]

  async addItemToCart(meal: Cart) {
    this.cartService.addProduct(meal);
    const alert = await this.alertController.create({
      message: 'Added to Cart',
      buttons: this.alertButtons,
    })
    await alert.present();

  }

  selectCategory(index) {
		const child = this.listElements[index].nativeElement;
		this.content.scrollToPoint(0, child.offsetTop - 120, 1000);
	}
}
