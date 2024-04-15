import { Injectable } from '@angular/core';
import { CrudserviceService } from '../../shared/services/crudservice.service';
import { TipoDocumentoRequest } from '../models/tipododumento-request.model';
import { TipoDocumentoResponse } from '../models/tipodocumento-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constant/url.constants';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService  extends CrudserviceService<TipoDocumentoRequest,TipoDocumentoResponse>{

  constructor(
    protected http:HttpClient,
  ){
    super(http, urlConstants.TipoDocumento)
   }
}
