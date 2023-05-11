import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { runInThisContext } from 'vm';
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
export class Tab3Page {
  yourEmail: string;
  yourName: any;
  yourSurname: any;
  userId: number;
  changeEmail: boolean = false;
  changePass: boolean = false;

  passwordChange = formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(4)]],
    repeatPassword: ['', Validators.required],
  });

  emailChange = formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService
  ) {
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
    throw new Error('Method not implemented.');
  }
  updateEmail() {
    if (this.emailChange.valid) {
      this.api.updateUserEmail(this.userId, this.email.value).subscribe(() => {
        this.auth.getUser().email = this.email.value;
        this.yourEmail = this.auth.getUser().email;
        this.changeEmail = false;
      });
    }
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
