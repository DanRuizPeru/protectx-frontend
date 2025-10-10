import { Routes } from '@angular/router';
import { LoginForm } from './iam/components/login-form/login-form';
import { SigninForm } from './iam/components/signin-form/signin-form';
import { UserLayout } from './iam/presentation/views/user-layout/user-layout';
import { HomeComponent } from './public/presentation/views/home-component/home-component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta vacía predeterminada
      { path: 'login', component: LoginForm },
      { path: 'signin', component: SigninForm },
    ],
  },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'cameras',
    loadComponent: () => import('./cameras/presentation/views/cameras-dashboard/cameras-dashboard.component')
      .then(c => c.CamerasDashboardComponent)
  },
  {
    path: 'cameras/:id/config',
    loadComponent: () => import('./cameras/presentation/views/camera-settings/camera-settings.component')
      .then(c => c.CameraSettingsComponent)
  },
  { path: '**', redirectTo: '' } // wildcard global al final
];
