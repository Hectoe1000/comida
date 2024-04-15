import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constant/url.constants';
import { ClienteRequest } from 'src/app/models/cliente-request.model';
import { ClienteResponse } from 'src/app/models/cliente-response.model';
import { Vcliente } from 'src/app/models/v-cliente.model';
import { GenericFilterRequest } from 'src/app/modules/mantenimiento/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/modules/mantenimiento/models/generic-filter-response.model';
import { CrudserviceService } from 'src/app/modules/shared/services/crudservice.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteserviceService extends CrudserviceService<ClienteRequest,ClienteResponse> {

  constructor(
   protected http:HttpClient,
  ) {
    super(http, urlConstants.clientedatos)
  }

  genericFilterView(request:GenericFilterRequest):Observable<GenericFilterResponse<Vcliente>> {
    return this._http.post<GenericFilterResponse<Vcliente>>(`${urlConstants.clientedatos}filter-view`, request);
  }
 }