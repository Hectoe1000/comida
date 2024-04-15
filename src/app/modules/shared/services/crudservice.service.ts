import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericFilterRequest } from '../../mantenimiento/models/generic-filter-request.model';
import { GenericFilterResponse } from '../../mantenimiento/models/generic-filter-response.model';
import { CrudInterface } from '../interfaces/crud-interface';

@Injectable({
  providedIn: 'root'
})
export class CrudserviceService <T,Y> implements CrudInterface<T,Y>{

  constructor(
    protected _http: HttpClient,
    @Inject('url_service') public url_service: string
  ) { }
  /**TODO: Obtiene la lista de toda la tabla */
  getall(): Observable<Y[]> {
    return this._http.get<Y[]>(this.url_service);
  }
  /**TODO: Inserta un registos */
  create(request: T): Observable<Y> {
    return this._http.post<Y>(this.url_service, request);
  }
  /**TODO: actuliza un registro */
  update(request: T): Observable<Y> {

    return this._http.put<Y>(this.url_service, request);
  }
  /**TODO: elimina un registro */
  delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url_service}${id}`);
  }
  /**TODO: nuestro filtro generico*/
  genericFilter(request:GenericFilterRequest):Observable<GenericFilterResponse<Y>> {
    return this._http.post<GenericFilterResponse<Y>>(`${this.url_service}filter`,request);
  }

}
