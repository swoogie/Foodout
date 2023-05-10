import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';

const formBuilder = new FormBuilder().nonNullable;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage {
  constructor(
    private storage: Storage,
    private apiService: ApiService,
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {}
  data$!: Observable<User[]>;
  users: User[] = [];
  userExist: boolean;

  navigateToRegistrationPage() {
    this.router.navigateByUrl('/tabs/registration');
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  loginForm = formBuilder.group({
    email: '',
    password: '',
  });

  signInUser() {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        if (this.authService.getUser()) {
          this.router.navigate(['/tabs/yourProfile']);
        } else {
        }
      },
      error: () => {
        this.alertCtrl
          .create({
            header: 'Login failed',
            message: 'Wrong credentials, try again',
            buttons: ['OK'],
          })
          .then((alert) => alert.present());
      },
    });
  }
}
