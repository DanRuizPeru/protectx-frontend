import { Component } from '@angular/core';
import {RouterOutlet, Router, NavigationEnd, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import {HeaderComponent} from '../../../../shared/components/header-component/header-component';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, HeaderComponent, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css'
})
export class UserLayout {
  showBackButton = false;

  constructor(private router: Router) {
    // Detecta cambios en la URL
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showBackButton = event.url === '/signin';
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
