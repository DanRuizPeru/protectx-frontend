import { Component } from '@angular/core';
import {NavbarComponent} from '../../../../shared/components/navbar-component/navbar-component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-base-leyout',
  imports: [NavbarComponent, RouterOutlet],
  standalone: true,
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.css'
})
export class BaseLayout {

}
