import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class Tab3Page {
  yourEmail: string;
  constructor(private auth: AuthService, private router: Router) {
    this.yourEmail = this.auth.getUser().email;
  }

  logout() {
    this.auth.logout();
  }
}
