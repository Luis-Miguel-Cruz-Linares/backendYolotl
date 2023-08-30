import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/pages/login/login.component';
import { ModificarComponent } from './view/pages/noticias/modificar/modificar.component';
import { NoticiasComponent } from './view/pages/noticias/noticias.component';
import { CrearComponent } from './view/pages/noticias/crear/crear.component';
import {AngularFireAuthGuard} from '@angular/fire/compat/auth-guard'
import { authActivateGuard } from './auth/auth-activate.guard';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'admin/noticias/modificar',
    component:ModificarComponent,
    canActivate:[authActivateGuard]
  },
  {
    path:'admin/noticias',
    component:NoticiasComponent,
    canActivate:[authActivateGuard]
  },
  {
    path:'admin/noticias/crear',
    component:CrearComponent,
    canActivate:[authActivateGuard]
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
