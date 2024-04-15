import { Injectable } from '@angular/core';
import { CrudserviceService } from '../../shared/services/crudservice.service';
import { CompraDetalleRequest } from '../models/compra-detalle-request.model';
import { CompraDetalleResponse } from '../models/compra-detalle-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constant/url.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraDetalleService extends CrudserviceService<CompraDetalleRequest,CompraDetalleResponse> {

  constructor(
    protected http:HttpClient,
   ) {
     super(http, urlConstants.compraDetalle)
   }
 
  insertmultiple(request:CompraDetalleRequest[]=[]):Observable<CompraDetalleResponse[]> {
  return this._http.post<CompraDetalleResponse[]>(`${urlConstants.compraDetalle}multiple/`, request);
}

}
