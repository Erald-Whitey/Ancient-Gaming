import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    children: [
      {
        path: '',
        loadComponent: () => import('./feature/posts/post-list.component')
      },
      {
        path: 'create',
        loadComponent: () => import('./feature/posts/post-create.component')
      },
      {
        path: 'view/:id',
        loadComponent: () => import('./feature/posts/post-view.component')
      }
    ]
  }
];
