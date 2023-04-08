import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../interfaces/restaurant';
import { Food } from '../interfaces/food';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('http://localhost:3000/restaurants');
  }

  get2Restaurants(pageNum: number): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      `http://localhost:3000/restaurants?_page=${pageNum}&_limit=3`
    );
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`http://localhost:3000/restaurants/${id}`);
  }

  getFoodByRestaurantId(id: string): Observable<Food[]> {
    return this.http.get<Food[]>(
      `http://localhost:3000/food?restaurant_id=${id}`
    );
  }
}
