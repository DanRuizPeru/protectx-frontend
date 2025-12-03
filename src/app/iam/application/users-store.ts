import { Injectable, signal } from '@angular/core';
import { IamApi } from '../infrastructure/iam-api';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../domain/model/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UsersStore {

  private readonly userSignal = signal<User | null>(this.getUserFromStorage());
  readonly currentUser = this.userSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  constructor(private iamApi: IamApi, private router: Router) {}

  addUsers(user: User) {
    this.loadingSignal.set(true);
    return this.iamApi.createUser(user).pipe(
      tap(response => {
        this.loadingSignal.set(false);
        console.log('✅ Registro exitoso en Backend:', response);
      }),
      catchError(error => {
        this.loadingSignal.set(false);
        console.error('❌ Error en registro:', error);
        return throwError(() => error);
      })
    );
  }

  login(username: string, password: string) {
    this.loadingSignal.set(true);
    // Nota: Pasamos un objeto { username, password } porque así lo espera el método login de IamApi
    return this.iamApi.login({ username, password }).pipe(
      tap((response: any) => {
        this.loadingSignal.set(false);
        console.log('✅ Login exitoso. Guardando sesión...');

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        this.userSignal.set(response.user);

        this.router.navigate(['/home']);
      }),
      catchError(error => {
        this.loadingSignal.set(false);
        console.error('❌ Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSignal.set(null);
    this.router.navigate(['/login']);
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}
