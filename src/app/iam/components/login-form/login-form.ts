import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersStore } from '../../application/users-store';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.ust.login(username, password).subscribe({
        next: () => {
          console.log('Login flow completed');
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorrectos',
            confirmButtonColor: '#d33'
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
