import { Injectable } from '@angular/core';
import { VProductoUsuario } from '../models/V-Producto-usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constant/url.constants';

@Injectable({
  providedIn: 'root'
})
export class SugerenciaService {

  constructor(
    private  _http:HttpClient
   ) {}
  getall():Observable<VProductoUsuario[]> 
  {
       return this._http.get<VProductoUsuario[]>(urlConstants.vistageneralusuario);
  }
}
