import { Injectable } from '@angular/core';
import { CrudserviceService } from '../../shared/services/crudservice.service';
import { MercadoPagoRequestf } from '../models/mercadopagorequest.model';
import { MercadoPagoResponsef } from '../models/mercadopagoresponse.model';
import { urlConstants } from 'src/app/constant/url.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService{

  constructor(
    protected http:HttpClient,
  ) {}

   enviardatopreviopago(request:MercadoPagoRequestf):Observable<MercadoPagoResponsef>
   {
     return this.http.post<MercadoPagoResponsef>(urlConstants.vistapasarela,request);
   }

}
