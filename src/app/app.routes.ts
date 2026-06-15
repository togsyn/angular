import { Routes } from '@angular/router';

import { AuthPage } from './pages/auth-page/auth-page';
import { SignupPage } from './pages/signup-page/signup-page';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MoreInformation } from './pages/more-info/more-information';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard';
import { StudentDetailsComponent } from './pages/student-details/student-details';

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
    path: 'more-info',
    component: MoreInformation
  },

  {
    path: 'students',
    component: StudentDashboardComponent
  },

  {
    path: 'student-details/:id',
    component: StudentDetailsComponent
  },

  {
    path: '**',
    redirectTo: ''
  }

];