import { Injectable } from '@angular/core';
import { find, map, Observable, of, switchMap } from 'rxjs';
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

  updateUserEmail(id: number, newEmail: string): Observable<any> {
    return this.getUserById(id).pipe(
      switchMap((user) => {
        const updatedUser = {
          ...user,
          email: newEmail,
        };
        return this.http.put(`http://localhost:3000/users/${id}`, updatedUser);
      })
    );
  }

  updateUserPassword(id: number, newPassword: string): Observable<any> {
    return this.getUserById(id).pipe(
      switchMap((user) => {
        const updatedUser = {
          ...user,
          password: newPassword,
        };
        return this.http.put(`http://localhost:3000/users/${id}`, updatedUser);
      })
    );
  }

  getUserById(id: number): Observable<User> {
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
