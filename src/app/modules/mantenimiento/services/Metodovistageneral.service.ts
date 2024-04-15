import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericFilterResponse } from '../models/generic-filter-response.model';
import { metodogeneralInterface } from '../models/v-usuario-producto-interfase.model';


@Injectable({
  providedIn: 'root'
})
export class MetodovistageneralService<Y> implements metodogeneralInterface<Y>{

  constructor(
    protected _http: HttpClient,
    @Inject('url_service') public url_service: string
  ) { }
  /**TODO: Obtiene la lista de toda la tabla */
  getall(): Observable<Y[]> {
    return this._http.get<Y[]>(this.url_service);
  }
  /**TODO: nuestro filtro generico*/
  genericFilter(request:Y):Observable<GenericFilterResponse<Y>> {
    return this._http.post<GenericFilterResponse<Y>>(`${this.url_service}filter`,request);
  }

}
