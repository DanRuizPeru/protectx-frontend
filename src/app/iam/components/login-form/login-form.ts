import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../domain/model/user.entity';
import { UsersStore } from '../../application/users-store';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, TranslatePipe, RouterLink],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginForm {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ust: UsersStore,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login(username: string, password: string): void {
    const user = this.ust.findUserByCredentials(username, password);

    if (user) {
      console.log('✅ Usuario encontrado:', user);
      localStorage.setItem('user', JSON.stringify(user));

      // Verificación rápida
      const storedUser = localStorage.getItem('user');
      console.log('📦 Usuario guardado:', storedUser ? JSON.parse(storedUser) : null);

      // 🔵 Redirigir al home solo si todo fue bien
      this.router.navigate(['/home']);
    } else {
      alert('❌ Usuario o contraseña incorrectos');
    }
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    this.login(username, password);
  }
}
