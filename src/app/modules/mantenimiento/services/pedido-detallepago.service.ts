import { Injectable } from '@angular/core';
import { CrudserviceService } from '../../shared/services/crudservice.service';
import { PedidoDetallePagoRequest } from '../models/pedidoDetallepago-request.model';
import { PedidoDetallePagoResponse } from '../models/pedidoDetallepago-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constant/url.constants';

@Injectable({
  providedIn: 'root'
})
export class PedidoDetallepagoService extends CrudserviceService<PedidoDetallePagoRequest,PedidoDetallePagoResponse> {
  constructor(
    protected http:HttpClient,
   ) {
     super(http, urlConstants.pedidoDetallePago)
   }
}
