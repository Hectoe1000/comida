import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeListComponent } from './modules/mantenimiento/component/welcome/welcome-list/welcome-list.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BolsacompraComponent } from './modules/mantenimiento/component/bolsacompra/bolsacompra.component';
import { IndirectionComponent } from './pages/indirection/indirection.component';
import { ConfirmacionpagoComponent } from './modules/mantenimiento/component/confirmacionpago/confirmacionpago.component';
import { RespuestacompraComponent } from './modules/mantenimiento/component/respuestacompra/respuestacompra.component';
import { ErrornoauthorizadoComponent } from './pages/error/errornoauthorizado/errornoauthorizado.component';
import { auhtGuard } from './guard/auht.guard';
import { compraGuard } from './guard/compra.guard';
import { compralistaGuard } from './guard/compralista.guard';
import { OcurriounerrorComponent } from './pages/error/ocurriounerror/ocurriounerror.component';
import { GmailComponent } from './pages/gmail/gmail.component';


const routes: Routes = [

  {
    path:'',component:WelcomeListComponent
  },
  {
    path:'carta',redirectTo:''
  },
  {
    path:'ubicanos',component:IndirectionComponent
  },
  {
    path:'carta',loadChildren:() => import("./modules/mantenimiento/mantenimiento.module").then(x => x.MantenimientoModule)
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'user',
    canActivate:[auhtGuard],
    loadChildren:() => import("./modules/auth/user/user.module").then(x => x.UserModule)
  },
  {
    path:'404',component:NotFoundComponent
  },
  {
    path:'bolsa',component:BolsacompraComponent
  },
  {
    path:'compralista',
    canActivate:[compraGuard],
    component:ConfirmacionpagoComponent
  },
  {
    path:'estadocompra',
    canActivate:[compralistaGuard],
    component:RespuestacompraComponent
  },
  {
    path:'401',component:ErrornoauthorizadoComponent
  },
  { 
    path:'error',component:OcurriounerrorComponent
  },
  {
    path:'**',redirectTo:'/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
