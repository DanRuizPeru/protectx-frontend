import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../domain/model/user.entity';
import { UsersStore } from '../../application/users-store';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, TranslatePipe],
  standalone: true,
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css'
})
export class SigninForm {
  signinForm: FormGroup;
  User = User;

  constructor(
    private fb: FormBuilder,
    private ust: UsersStore,
    private router: Router,
    private translate: TranslateService
  ) {
    this.signinForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.signinForm.get(controlName);
    return !!(control?.hasError(errorName) && (control.dirty || control.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.signinForm.valid) {

      const rawUser = this.signinForm.value;

      this.ust.addUsers(rawUser as any).subscribe({
        next: async () => {
          console.log('✅ Usuario registrado');

          const title = await this.translate.get('signin.success.title').toPromise();
          const text = await this.translate.get('signin.success.message').toPromise();
          const confirm = await this.translate.get('signin.success.confirm').toPromise();

          Swal.fire({
            icon: 'success',
            title: title || 'Éxito',
            text: text || 'Usuario registrado correctamente',
            confirmButtonText: confirm || 'OK',
            confirmButtonColor: '#0E587C'
          }).then(() => this.router.navigate(['/login']));
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar (Revisa que el usuario no exista ya)',
            confirmButtonColor: '#d33'
          });
        }
      });
    } else {
      this.signinForm.markAllAsTouched();
    }
  }
}
