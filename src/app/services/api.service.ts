import { Injectable } from '@angular/core';
import { find, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../interfaces/restaurant';
import { User } from '../interfaces/user';
import { Food } from '../interfaces/food';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  data$!: Observable<User[]>;
  user!: Observable<User>;
  users: User[] = [];

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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users?email=${email}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }

  getFoodByRestaurantId(id: string): Observable<Food[]> {
    return this.http.get<Food[]>(
      `http://localhost:3000/food?restaurant_id=${id}`
    );
  }

  postOrder(data: any): Observable<any> {
    const newOrder: Order = {
      id: null,
      order: data,
    };
    return this.http.post('http://localhost:3000/orders', newOrder);
  }

  getUserOrders(): Observable<any> {
    return this.http.get('http://localhost:3000/orders');
  }
}
