import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  addNewUser(user: User) {
    return this.http.post<User>('https://foodoutapi.onrender.com/users', user);
  }
}
