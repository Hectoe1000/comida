import { Injectable } from '@angular/core';
import { UsuarioRequest } from '../models/usuario-request.model';
import { UsuarioResponse } from '../models/usuario-response.model';
import { urlConstants } from 'src/app/constant/url.constants';
import { HttpClient } from '@angular/common/http';
import { CrudserviceService } from '../../shared/services/crudservice.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService  extends CrudserviceService<UsuarioRequest,UsuarioResponse> {

  constructor(
    protected http:HttpClient,
  ){
    super(http, urlConstants.usuario)
   }

   buscartodo():Observable<UsuarioResponse[]>
   {
    return this._http.get<UsuarioResponse[]>(urlConstants.usuariobusca)
   }

   filtro(request:UsuarioRequest)
   {
     return this.http.post<number>(`${urlConstants.usuario}busqueda/`, request);
   }


}
