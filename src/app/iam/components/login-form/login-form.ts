import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../domain/model/user.entity';
import { UsersStore } from '../../application/users-store';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, TranslatePipe, RouterLink],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginForm {
  loginForm: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private ust: UsersStore) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }


  login(username: string, password: string): void {
    const user = this.ust.findUserByCredentials(username, password);
    if (user) {
      console.log('✅ Usuario encontrado:', user);
      //guardar el usuario en local storage
      localStorage.setItem('user', JSON.stringify(user));

      // 🔵 Recuperar el usuario guardado y mostrarlo como prueba
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        console.log('📦 Usuario guardado en localStorage:', JSON.parse(storedUser));
      }
    } else {
      console.log('❌ Usuario o contraseña incorrectos');
    }
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    this.login(username, password);
  }

}
