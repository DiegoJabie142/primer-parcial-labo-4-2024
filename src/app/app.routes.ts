import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { adminGuard } from './guards/admin.guard';
import { canDeactivateGuard } from './guards/can-deactivate.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full' // Esto asegura que se redirija si el path está completamente vacío
    },
        
    {
        path:'terminos-condiciones', loadComponent:()=>
        import('./components/acetar-terminos/acetar-terminos.component').then((m)=>m.AcetarTerminosComponent),
        canDeactivate: [canDeactivateGuard]
    },
    {
        path:'AltaChofer', loadComponent:()=>
        import('./components/alta-chofer/alta-chofer.component').then((m)=>m.AltaChoferComponent),
        canActivate: [authGuard]
    },
    {
        path:'Login', loadComponent:()=>
        import('./auth/login/login.component').then((m)=>m.LoginComponent),
        canActivate: [noAuthGuard],
    }
    ,
    {
        path:'Register', loadComponent:()=>
        import('./auth/register/register.component').then((m)=>m.RegisterComponent),
        canActivate: [noAuthGuard],
    },
    {
        path:'home', loadComponent:()=>
        import('./components/home/home.component').then((m)=>m.HomeComponent),
    },
    {
        path:'Choferes', loadComponent:()=>
        import('./components/choferes/choferes.component').then((m)=>m.ChoferesComponent),
        canActivate: [authGuard]
    },
    {
        path:'vehiculos', loadComponent:()=>
        import('./components/vehiculos/vehiculos.component').then((m)=>m.VehiculosComponent),
        canActivate: [adminGuard]
    },


];
