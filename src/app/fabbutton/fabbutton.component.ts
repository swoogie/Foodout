import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-fabbutton',
  templateUrl: './fabbutton.component.html',
  styleUrls: ['./fabbutton.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class FabbuttonComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
