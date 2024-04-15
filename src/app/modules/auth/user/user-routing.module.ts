import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestShopingComponent } from './component/latest-shoping/latest-shoping.component';
import { DetailComponent } from './detail/detail.component';
import { ControlpassComponent } from './component/controlpass/controlpass.component';
import { DirectionsComponent } from './component/directions/directions.component';
import { DirectionsnewComponent } from './component/directionsnew/directionsnew.component';

const routes: Routes = [
{
  path:'anteriores',component:LatestShopingComponent
},
{
  path:'perfil',component:DetailComponent
},
{
 path:'pass',component:ControlpassComponent
},
{
  path:'directions',component:DirectionsComponent
},
{
  path:'newdirection',component:DirectionsnewComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
