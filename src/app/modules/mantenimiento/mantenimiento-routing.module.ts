import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CafesComponent } from "./component/cafes/cafes.component";
import { HamburguesasComponent } from "./component/hamburguesas/hamburguesas.component";
import { BebidasComponent } from "./component/bebidas/bebidas.component";
import { CoctelesComponent } from "./component/cocteles/cocteles.component";
import { PiqueosComponent } from "./component/piqueos/piqueos.component";
import { PostresComponent } from "./component/postres/postres.component";
import { SalchipapasComponent } from "./component/salchipapas/salchipapas.component";

const routes: Routes = [
    
    {path:'cafes',component:CafesComponent},
    {path:'bebidas',component:BebidasComponent},
    {path:'cocteles',component:CoctelesComponent},
    {path:'hamburguesas',component:HamburguesasComponent},
    {path:'piqueos',component:PiqueosComponent},
    {path:'postres',component:PostresComponent},
    {path:'salchipapas',component:SalchipapasComponent},
    {path:'**',component:SalchipapasComponent},
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MatenimientoRoutingModule { }
