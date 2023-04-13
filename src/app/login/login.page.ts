import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

const formBuilder = new FormBuilder().nonNullable;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}
  data$!: Observable<User[]>;
  users: User[] = [];
  userExist: boolean;

  ngOnInit() {
    this.data$ = this.apiService.getUsers();
    this.data$.pipe().subscribe((e) => {
      this.users = e;
    });
  }

  navigateToRegistrationPage() {
    this.router.navigate(['/registration']);
  }

  getForm = formBuilder.group({
    email: '',
    password: '',
  });

  email: string;
  password: string;
  signInUser() {
    this.email = this.getForm.controls.email.value;
    this.password = this.getForm.controls.password.value;

    if(this.apiService.checkIfUserExist(this.email, this.password))
      console.log("Čia turėtų gauti user info")
      this.apiService.getUserByEmail(this.email).subscribe(res => console.log(res))
  }
}
