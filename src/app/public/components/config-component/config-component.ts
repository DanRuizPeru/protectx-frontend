import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NavbarComponent } from '../../../shared/components/navbar-component/navbar-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-component',
  standalone: true,
  imports: [TranslatePipe, NavbarComponent],
  templateUrl: './config-component.html',
  styleUrl: './config-component.css'
})
export class ConfigComponent {
  constructor(private router: Router) {}

  goToEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  goToAssistance(): void {
    this.router.navigate(['/assistance']);
  }
}
