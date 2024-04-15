import { Injectable } from '@angular/core';
import { CrudserviceService } from '../../shared/services/crudservice.service';
import { MovimientoCajaRequest } from '../models/movimientoCaja-request.model';
import { MovimientoCajaResponse } from '../models/movimientoCaja-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constant/url.constants';

@Injectable({
  providedIn: 'root'
})
export class MovimientoCajaService extends CrudserviceService<MovimientoCajaRequest,MovimientoCajaResponse> {


  constructor(
    protected http:HttpClient,
   ) {
     super(http, urlConstants.movimientoCaja)
   }
 
}
