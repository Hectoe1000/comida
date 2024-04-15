import { Injectable } from '@angular/core';
import { MercadoResponse } from '../models/MercadoResponse.model';
import { urlConstants } from 'src/app/constant/url.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularResponsePago } from '../models/respuestamercadoangularesponse.model';

@Injectable({
  providedIn: 'root'
})
export class IdvistapagosService {

  constructor(
    private  _http:HttpClient
   ) {}

   filter(id:number):Observable<MercadoResponse>
   {
     return this._http.get<MercadoResponse>(`${urlConstants.mercado}${id}`);
   }

   getall(id:number):Observable<AngularResponsePago>
   {
    return this._http.get<AngularResponsePago>(`${urlConstants.vistapasarela}${id}`)
   }
}
