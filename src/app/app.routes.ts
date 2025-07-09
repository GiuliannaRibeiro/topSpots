import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./template/layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'categories',
        loadComponent: () =>
          import('./categories/categories.component').then((m) => m.CategoriesComponent),
        data: { title: 'Categories', subTitle: '' }
      },
      {
        path: 'places',
        loadComponent: () =>
          import('./places/places.component').then((m) => m.PlacesComponent),
        data: { title: 'Places', subTitle: '' }
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./gallery/gallery.component').then((m) => m.GalleryComponent),
        data: { title: 'Gallery', subTitle: '' }
      },
    ],
  },
];
