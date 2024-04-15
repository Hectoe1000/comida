import { Injectable } from '@angular/core';
import { CrudserviceService } from '../../shared/services/crudservice.service';
import { PedidoRequest } from '../models/pedido-request.model';
import { PedidoResponse } from '../models/pedido-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constant/url.constants';

@Injectable({
  providedIn: 'root'
})
export class PedidoService  extends CrudserviceService<PedidoRequest,PedidoResponse>{

  constructor(
    protected http:HttpClient,
   ) {
     super(http, urlConstants.pedido)
   }

}
