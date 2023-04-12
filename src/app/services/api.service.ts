import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../interfaces/restaurant';
import { User } from '../interfaces/user';
import { Food } from '../interfaces/food';

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

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }

  checkIfUserExist(email: string, password: string): boolean {
    this.data$ = this.getUsers();
    this.data$.pipe().subscribe((e) => {
      this.users = e;
    });

    const userWithEmail = this.users.find(
      (user) => user.email === email && user.password === password
    );

    return !!userWithEmail;
  }

  getUserByEmail(email: string): Observable<User> {
    return this.getUsers().pipe(
      map((users) => users.find((user) => user.email === email))
    );
  }
  getFoodByRestaurantId(id: string): Observable<Food[]> {
    return this.http.get<Food[]>(
      `http://localhost:3000/food?restaurant_id=${id}`
    );
  }

  postOrder(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/orders', data);
  }
}
