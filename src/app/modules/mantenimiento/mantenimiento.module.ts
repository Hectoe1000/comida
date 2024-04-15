import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeListComponent } from './component/welcome/welcome-list/welcome-list.component';
import { MatenimientoRoutingModule } from './mantenimiento-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CafesComponent } from './component/cafes/cafes.component';
import { HamburguesasComponent } from './component/hamburguesas/hamburguesas.component';
import { SalchipapasComponent } from './component/salchipapas/salchipapas.component';
import { PiqueosComponent } from './component/piqueos/piqueos.component';
import { CoctelesComponent } from './component/cocteles/cocteles.component';
import { PostresComponent } from './component/postres/postres.component';
import { BebidasComponent } from './component/bebidas/bebidas.component';
import { TemplateFooterComponent } from '../template/template-footer/template-footer.component';
import { TemplateListaComponent } from '../template/template-lista/template-lista.component';
import { TemplateNavbarComponent } from '../template/template-navbar/template-navbar.component';
import { ModalproductoComponent } from './component/modalproducto/modalproducto.component';
import { BolsacompraComponent } from './component/bolsacompra/bolsacompra.component';
import { ConfirmacionpagoComponent } from './component/confirmacionpago/confirmacionpago.component';
import { ModalrutasComponent } from './component/modalrutas/modalrutas.component';
import { RespuestacompraComponent } from './component/respuestacompra/respuestacompra.component';

 
@NgModule({
  declarations: [
    WelcomeListComponent,
    CafesComponent,
    HamburguesasComponent,
    SalchipapasComponent,
    PiqueosComponent,
    CoctelesComponent,
    PostresComponent,
    BebidasComponent,
    TemplateFooterComponent,
    TemplateListaComponent,
    TemplateNavbarComponent,
    ModalproductoComponent,
    BolsacompraComponent,
    ConfirmacionpagoComponent,
    ModalrutasComponent,
    RespuestacompraComponent,
  ],
  imports: [
    CommonModule,
    MatenimientoRoutingModule,
    SharedModule
  ]
})
export class MantenimientoModule { }
