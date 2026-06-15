import { Routes } from '@angular/router';

import { AuthPage } from './pages/auth-page/auth-page';
import { SignupPage } from './pages/signup-page/signup-page';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [

  {
    path: '',
    component: AuthPage
  },

  {
    path: 'signup',
    component: SignupPage
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: '**',
    redirectTo: ''
  }

];