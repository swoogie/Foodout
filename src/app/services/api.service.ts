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
    return this.http.get<Restaurant[]>(
      'https://foodoutapi.onrender.com/restaurants'
    );
  }

  get2Restaurants(pageNum: number): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      `https://foodoutapi.onrender.com/restaurants?_page=${pageNum}&_limit=3`
    );
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(
      `https://foodoutapi.onrender.com/restaurants/${id}`
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://foodoutapi.onrender.com/users');
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(
      `https://foodoutapi.onrender.com/users?email=${email}`
    );
  }

  updateUserEmail(id: number, newEmail: string): Observable<any> {
    return this.getUserById(id).pipe(
      switchMap((user) => {
        const updatedUser = {
          ...user,
          email: newEmail,
        };
        return this.http.put(
          `https://foodoutapi.onrender.com/users/${id}`,
          updatedUser
        );
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
        return this.http.put(
          `https://foodoutapi.onrender.com/users/${id}`,
          updatedUser
        );
      })
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`https://foodoutapi.onrender.com/users/${id}`);
  }

  getFoodByRestaurantId(id: string): Observable<Food[]> {
    return this.http.get<Food[]>(
      `https://foodoutapi.onrender.com/food?restaurant_id=${id}`
    );
  }

  postOrder(userId: number, data: any): Observable<any> {
    const newOrder: Order = {
      id: null,
      userId: userId,
      order: data,
    };
    return this.http.post('https://foodoutapi.onrender.com/orders', newOrder);
  }

  getUserOrders(id: number): Observable<any> {
    return this.http.get(
      `https://foodoutapi.onrender.com/orders/?userId=${id}`
    );
  }
}
