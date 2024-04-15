import { Injectable } from '@angular/core';
import { Vdireccion } from '../models/V-direccion.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constant/url.constants';
import { GenericFilterRequest } from '../models/generic-filter-request.model';
import { GenericFilterResponse } from '../models/generic-filter-response.model';
import { CrudserviceService } from '../../shared/services/crudservice.service';
import { DireccionRequest } from '../models/direccion-request.model';
import { DireccionResponse } from '../models/direccion-response.model';

@Injectable({
  providedIn: 'root'
})
export class DireccionService extends CrudserviceService<DireccionRequest,DireccionResponse> {

  constructor(
   protected http:HttpClient,
  ) {
    super(http, urlConstants.direccion)
  }

  genericFilterView(request:GenericFilterRequest):Observable<GenericFilterResponse<Vdireccion>> {
    return this._http.post<GenericFilterResponse<Vdireccion>>(`${urlConstants.direccion}filter-view`, request);
  }
}
