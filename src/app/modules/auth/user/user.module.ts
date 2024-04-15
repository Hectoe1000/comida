import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { DetailComponent } from './detail/detail.component';
import { OptionsComponent } from './options/options.component';
import { ControlpassComponent } from './component/controlpass/controlpass.component';
import { DirectionsComponent } from './component/directions/directions.component';
import { LatestShopingComponent } from './component/latest-shoping/latest-shoping.component';
import { SharedModule } from '../../shared/shared.module';
import { TemplateNavbarComponent } from './template/template-navbar/template-navbar.component';
import { TemplateFooterComponent } from './template/template-footer/template-footer.component';
import { TemplateSidevarComponent } from './template/template-sidevar/template-sidevar.component';
import { DirectionsnewComponent } from './component/directionsnew/directionsnew.component';


@NgModule({
  declarations: [
    DetailComponent,
    OptionsComponent,
    ControlpassComponent,
    DirectionsComponent,
    LatestShopingComponent,
    TemplateNavbarComponent,
    TemplateFooterComponent,
    TemplateSidevarComponent,
    DetailComponent,
    DirectionsnewComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
