import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login-page/login-page';   // ✅ rename this file/class to LoginComponent if you prefer
import { SignupPage } from './pages/signup-page/signup-page';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MoreInfoComponent } from './pages/more-info/more-information';
import { ViewDetailsComponent } from './view-details/view-details';
import { ProfileComponent } from './profile/profile';
import { DashboardHomeComponent } from './pages/dashboard-home-component/dashboard-home-component';
import { authGuard } from './auth-guard';
import { PaymentComponent } from './pages/payment-component/payment-component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },   // ✅ changed to /login
  { path: 'login', component: LoginComponent },                  // ✅ renamed route
  { path: 'signup', component: SignupPage },               // ✅ optional: shorter name
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'more-information', component: MoreInfoComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'viewdetails/:id', component: ViewDetailsComponent },

    ]
  },
  { path: '**', redirectTo: '/login' }                     // ✅ fallback to login
];

export const AppRoutingModule = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
