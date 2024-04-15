import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constant/url.constants';
import { GenericFilterRequest } from '../models/generic-filter-request.model';
import { GenericFilterResponse } from '../models/generic-filter-response.model';
import { MetodovistageneralService } from './Metodovistageneral.service';
import { VProductoUsuario } from '../models/V-Producto-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class VistaproductousurioService extends MetodovistageneralService<VProductoUsuario>{

  constructor( protected http:HttpClient,) {super(http, urlConstants.vistageneralusuario) }

  genericFilterView(request:GenericFilterRequest):Observable<GenericFilterResponse<VProductoUsuario>> {
    return this._http.post<GenericFilterResponse<VProductoUsuario>>(`${urlConstants.vistageneralusuario}filter-view`, request);
  }

}
