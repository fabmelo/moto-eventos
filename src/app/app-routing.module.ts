import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'login-register',
    loadChildren: () => import('./modules/login-register/login-register.module').then((m) => m.LoginRegisterModule),
  },
  {
    path: 'login-reset',
    loadChildren: () => import('./modules/login-reset/login-reset.module').then((m) => m.LoginResetModule),
  },
  {
    path: 'home',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'event-my',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./modules/event-my/event-my.module').then((m) => m.EventMyModule),
  },
  {
    path: 'event-register',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./modules/event-register/event-register.module').then((m) => m.EventRegisterModule),
  },
  {
    path: 'event-list',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./modules/event-list/event-list.module').then((m) => m.EventListModule),
  },
  {
    path: 'event-detail/:id',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./modules/event-detail/event-detail.module').then((m) => m.EventDetailModule),
  },
  {
    path: 'event-edit/:id',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./modules/event-edit/event-edit.module').then((m) => m.EventEditModule),
  },
  {
    path: 'nao-encontrado',
    loadChildren: () => import('./modules/nao-encontrado/nao-encontrado.module').then((m) => m.NaoEncontradoModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full',},
  { path: '**', redirectTo: 'nao-encontrado' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
