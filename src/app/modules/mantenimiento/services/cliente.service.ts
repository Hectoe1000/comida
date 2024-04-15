import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constant/url.constants';
import { CrudserviceService } from '../../shared/services/crudservice.service';;
import { GenericFilterRequest } from '../models/generic-filter-request.model';
import { GenericFilterResponse } from '../models/generic-filter-response.model';
import { Vcliente } from '../models/v-cliente.model';
import { ClienteRequest } from 'src/app/models/cliente-request.model';
import { ClienteResponse } from 'src/app/models/cliente-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudserviceService<ClienteRequest,ClienteResponse> {
  constructor(
    protected http:HttpClient,
  ) {
    super(http, urlConstants.cliente)
   }
  
   genericFilterView(request:GenericFilterRequest):Observable<GenericFilterResponse<Vcliente>> {
    return this._http.post<GenericFilterResponse<Vcliente>>(`${urlConstants.cliente}filter-view`, request);
  }
}
