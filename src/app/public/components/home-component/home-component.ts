import {Component, OnInit} from '@angular/core';
import { NavbarComponent} from '../../../shared/components/navbar-component/navbar-component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-home-component',
  imports: [NavbarComponent, TranslatePipe],
  standalone: true,
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit{
  user: any = null;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user'); // el nombre de la clave puede variar
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      console.log('Usuario cargado:', this.user);
    } else {
      console.warn('No hay usuario en el localStorage');
    }
  }
}
