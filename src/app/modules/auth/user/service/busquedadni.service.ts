import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constant/url.constants';
import { busquedadni } from 'src/app/models/busquedadni.model';
import { ClienteRequest } from 'src/app/models/cliente-request.model';
import { ClienteResponse } from 'src/app/models/cliente-response.model';
import { CrudserviceService } from 'src/app/modules/shared/services/crudservice.service';

@Injectable({
  providedIn: 'root'
})
export class BusquedadniService extends CrudserviceService<ClienteRequest,ClienteResponse>  {

  constructor(
    protected http:HttpClient,
   ) {
     super(http, urlConstants.cliente)
   }
   busqueda(b:busquedadni): Observable<ClienteResponse> {
    return this._http.get<ClienteResponse>(`${urlConstants.cliente}dni/${b.tipoDocumento}/${b.nroDocumento}`);
   }
}
