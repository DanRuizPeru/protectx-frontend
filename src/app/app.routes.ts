import { Routes } from '@angular/router';
import { LoginForm } from './iam/components/login-form/login-form';
import { SigninForm } from './iam/components/signin-form/signin-form';
import { UserLayout } from './iam/presentation/views/user-layout/user-layout';
import { HomeComponent } from './public/components/home-component/home-component';
import { ConfigComponent } from './public/components/config-component/config-component';
import { BaseLayout } from './public/presentation/views/base-leyout/base-layout';
import { SupportLayout } from './public/presentation/views/support-layout/support-layout';
import { FrequentQuestions } from './public/components/frequent-questions/frequent-questions';
import { HumanSuport } from './public/components/human-suport/human-suport';
import { CamerasDashboardComponent } from './cameras/presentation/views/cameras-dashboard/cameras-dashboard.component';
import { AlertsDashboardComponent } from './alerts/presentation/views/alerts-dashboard/alerts-dashboard.component';


export const routes: Routes = [
  // 🔹 LOGIN / SIGNIN layout
  {
    path: '',
    component: UserLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginForm },
      { path: 'signin', component: SigninForm },
    ],
  },

  // 🔹 LAYOUT PRINCIPAL
  {
    path: '',
    component: BaseLayout,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'camaras', component: CamerasDashboardComponent},
      { path: 'alertas', component: AlertsDashboardComponent},
      { path: 'settings', component: ConfigComponent },
    ],
  },

  // 🔹 SOPORTE layout
  {
    path: 'assistance',
    component: SupportLayout,
    children: [
      { path: '', redirectTo: 'frequent-questions', pathMatch: 'full' },
      { path: 'frequent-questions', component: FrequentQuestions },
      { path: 'human-suport', component: HumanSuport },

    ],
  },
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
  {
    path: 'alerts',
    loadComponent: () => import('./alerts/presentation/views/alerts-dashboard/alerts-dashboard.component')
      .then(c => c.AlertsDashboardComponent)
  },



  // 🔹 WILDCARD
  { path: '**', redirectTo: 'login' },
];
