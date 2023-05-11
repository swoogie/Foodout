import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { runInThisContext } from 'vm';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import {
  FormsModule,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

const formBuilder = new FormBuilder().nonNullable;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class Tab3Page implements OnInit {
  yourEmail: string;
  yourName: any;
  yourSurname: any;
  userId: number;
  changeEmail: boolean = false;
  changePass: boolean = false;
  debounce: boolean = false;
  prevPassErr: string = 'Enter previous password';
  passwordChange = formBuilder.group({
    prevPassword: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
    repeatPassword: ['', Validators.required],
  });

  emailChange = formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.yourEmail = this.auth.getUser().email;
    this.api.getUserByEmail(this.yourEmail).subscribe((user) => {
      this.yourName = user[0].firstName;
      this.yourSurname = user[0].lastName;
      this.userId = user[0].id;
    });
  }

  logout() {
    this.auth.logout();
  }
  updatePass() {
    if (this.password.value !== this.repeatPassword.value) {
      this.repeatPassword.setErrors({ passwordMismatch: true });
    } else if (this.prevPassword.value == this.auth.getUser().password) {
      this.api
        .updateUserPassword(this.userId, this.password.value)
        .subscribe(() => {
          this.auth.getUser().password = this.password;
          this.changePass = false;
          this.presentToast();
        });
    } else {
      this.prevPassword.setErrors({ incorrectPass: true });
      this.prevPassErr = 'Incorrect password';
    }
  }
  updateEmail() {
    if (this.emailChange.valid) {
      this.api.updateUserEmail(this.userId, this.email.value).subscribe(() => {
        this.auth.getUser().email = this.email.value;
        this.yourEmail = this.auth.getUser().email;
        this.changeEmail = false;
        this.presentToast();
      });
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Updated successfully ✅',
      duration: 1000,
      position: 'bottom',
    });

    await toast.present();
  }

  get prevPassword() {
    return this.passwordChange.get('prevPassword');
  }

  get password() {
    return this.passwordChange.get('password');
  }

  get repeatPassword() {
    return this.passwordChange.get('repeatPassword');
  }

  get email() {
    return this.emailChange.get('email');
  }
}
