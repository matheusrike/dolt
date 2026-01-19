import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { PageNotFound } from './components/page-not-found/page-not-found';

// Add Routes Here

export const routes: Routes = [
  // Simple Routes
  {
    path: '',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },

  // Wrong Routes
  {
    path: '**',
    component: PageNotFound,
  },
];
