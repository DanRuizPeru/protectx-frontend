import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-suport-navbar',
  imports: [LanguageSwitcher, TranslatePipe, RouterLink],
  standalone: true,
  templateUrl: './support-navbar.html',
  styleUrl: './support-navbar.css'
})
export class SupportNavbar {
  constructor(private router: Router) {}
  logout() {
    localStorage.clear(); // elimina todos los datos guardados
    this.router.navigate(['/login']); // redirige al login
  }
}
