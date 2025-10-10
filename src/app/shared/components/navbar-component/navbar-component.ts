import { Component } from '@angular/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {TranslatePipe} from '@ngx-translate/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [LanguageSwitcher, TranslatePipe],
  standalone: true,
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}
  logout() {
    localStorage.clear(); // elimina todos los datos guardados
    this.router.navigate(['/login']); // redirige al login
  }
}
