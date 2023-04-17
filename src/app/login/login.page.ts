import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';

const formBuilder = new FormBuilder().nonNullable;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {}
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

  loginForm = formBuilder.group({
    email: '',
    password: '',
  });

  email: string;
  password: string;

  signInUser() {
    this.email = this.loginForm.controls.email.value;
    this.password = this.loginForm.controls.password.value;

    this.authService.login(this.email, this.password).subscribe(async value => {
      if (value) {
        this.router.navigate(['/tabs/yourProfile']);
      } else {
        this.alertCtrl
        .create({
          header: 'Login failed',
          message: 'Wrong credentials, try again',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
      }
    })

    // if (this.apiService.checkIfUserExist(this.email, this.password)) {
    //   this.apiService.getUserByEmail(this.email).subscribe((res) => {
    //     this.router.navigate(['/tabs/yourProfile']);
    //   });
    // } else {
    //   this.alertCtrl
    //     .create({
    //       header: 'Unauthorized',
    //       message: 'Wrong credentials, try again',
    //       buttons: ['OK'],
    //     })
    //     .then((alert) => alert.present());
    // }
  }
}
