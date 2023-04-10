import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostService } from '../services/post.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit() { }

  postForm = formBuilder.group({
    id: [],
    firstName: [''],
    lastName: [''],
    email: [''],
    password: [''],
  });

  addUser() {
    this.postService
      .addNewUser(this.postForm.value as User)
      .subscribe((response) => {
        this.router.navigate(['/tabs/yourProfile']);
      });
  }
}
