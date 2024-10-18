import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full' // Esto asegura que se redirija si el path está completamente vacío
    },
    {
    path:'AltaChofer', loadComponent:()=>
    import('./components/alta-chofer/alta-chofer.component').then((m)=>m.AltaChoferComponent),
    canActivate: [authGuard]
    },
    {
    path:'AltaPelicula', loadComponent:()=>
    import('./components/alta-pelicula/alta-pelicula.component').then((m)=>m.AltaPeliculaComponent)
    },
    {
        path:'Peliculas', loadComponent:()=>
        import('./components/peliculas/peliculas.component').then((m)=>m.PeliculasComponent)
    }
    ,/* 
    {
        path:'Actores', 
        loadComponent:()=>
        import('./components/actores/actores.component').then((m)=>m.ActoresComponent),
        canActivate: [authGuard]
    },
    */
    {
        path:'Actores', 
        loadComponent:()=>
        import('./components/actores/actores.component').then((m)=>m.ActoresComponent),
    },
    {
        path:'Login', loadComponent:()=>
        import('./auth/login/login.component').then((m)=>m.LoginComponent),
    }
    ,
    {
        path:'Register', loadComponent:()=>
        import('./auth/register/register.component').then((m)=>m.RegisterComponent),
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


];
