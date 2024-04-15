import { Observable } from "rxjs";

export interface CrudInterface<T,Y> {

   getall():Observable<Y[]>; 
   create(request:T):Observable<Y>;
   update(request:T):Observable<Y>;
   delete(id:number):Observable<number>;
    //FALTA ->  obtencion por filtro
    //crear multiple
    //uptadre multiple
}
