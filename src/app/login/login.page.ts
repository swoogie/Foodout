import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
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
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}
  data$!: Observable<User[]>;
  users: User[] = [];
  userExist: boolean;
  incorrect: boolean = false;
  loading: boolean = false;
  loginForm = formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    },
    { updateOn: 'change' }
  );

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.incorrect = false;
    });
  }

  navigateToRegistrationPage() {
    this.router.navigateByUrl('/tabs/registration');
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  signInUser() {
    this.loading = true;
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.authService.user.subscribe((res) => {
          if (res) {
            this.loading = false;
            const route =
              this.activatedRoute.snapshot.queryParams['route'] ||
              '/restaurants';
            this.router.navigate([`/tabs/${route}`]);
          }
        });
      },
      error: () => {
        this.incorrect = true;
        this.loading = false;
      },
    });
  }
}
