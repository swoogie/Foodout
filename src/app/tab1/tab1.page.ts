import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Restaurant } from '../interfaces/restaurant';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule, RouterModule],
})
export class Tab1Page implements OnInit {
  constructor(private apiService: ApiService, private renderer: Renderer2) {}
  data$!: Observable<Restaurant[]>;
  results$!: Observable<Restaurant[]>;
  @ViewChild('header') header: HTMLElement;
  @ViewChild('searchbar') searchbar: HTMLElement;

  ngOnInit() {
    this.data$ = this.apiService.getRestaurants();
    this.results$ = this.data$;
  }

  filterItemsByTitle(event: Event): void {
    const query = (<HTMLInputElement>event.target).value.toLowerCase();
    this.results$ = this.data$.pipe(
      map((items) =>
        items.filter((item) => item.title.toLowerCase().includes(query))
      )
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

  // public results = [...this.data];

  // handleChange(event): void {
  //   const query = event.target.value.toLowerCase();
  //   this.results = this.data.filter((d) => d.rest.toLowerCase().indexOf(query) > -1);
  // }
}
