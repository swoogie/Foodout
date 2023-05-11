import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  PatternValidator,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IonInput, IonicModule } from '@ionic/angular';
import { PostService } from '../services/post.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

const formBuilder = new FormBuilder().nonNullable;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegistrationPage implements OnInit {
  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService
  ) {}
  postForm = formBuilder.group(
    {
      id: [],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [Validators.required]],
    },
    {
      updateOn: 'blur',
    }
  );

  ngOnInit() {
    this.postForm.valueChanges.subscribe(() => {
      if (this.password.value !== this.repeatPassword.value) {
        this.repeatPassword.setErrors({ passwordMismatch: true });
      }
    });
  }

  isUserLoggedIn() {
    if (this.authService.getUser()) {
      return true;
    } else {
      return false;
    }
  }

  goBack() {
    this.router.navigate(['/tabs/login']);
  }

  addUser() {
    if (this.postForm.valid) {
      console.log('form is valid');
      this.postService
        .addNewUser(this.postForm.value as User)
        .subscribe((response) => {
          this.router.navigate(['/tabs/login']);
        });
    } else {
      console.log('form is not valid');
    }
  }

  get password() {
    return this.postForm.get('password');
  }
  get firstName() {
    return this.postForm.get('firstName');
  }
  get lastName() {
    return this.postForm.get('lastName');
  }
  get repeatPassword() {
    return this.postForm.get('repeatPassword');
  }
}
