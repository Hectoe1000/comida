import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { alert_error, alert_success, alert_warning } from 'src/app/constant/General-constatn';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router:Router
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token=sessionStorage.getItem("token");

    let request=req
    if(token){
       request=req.clone(
       {
         setHeaders:{
           authorization:`Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError(
        (err:HttpErrorResponse)=>{
          let error=err.error;
          let title:string="Error en el servidor ";
          switch(err.status){
            case 400: //bad reques 
            alert_error("Error",7000,"Error de Bad Request");
              break;
            case 401: //no hay token  
            alert_success("Error",7000,"Vuelve a iniciar sesion");
            this.router.navigate(['#/auth']);
              break;
            case 404: //url no encontrado 
              alert_warning("funcion no encontrada","error");
              break;
            case 403: //no tienes permiso 
            alert_warning("Error","No tienes permisos");
              break;
            case 500: //error no controlado 
              alert_error("Error",8000,"ocurrio un problema ");
              break;
              case 0:
                alert_warning("Error","No se puede comunicar con el servicio"); 
              break;
            default :
              alert_success("ERROR NO CONTROLADO");
              break
          }
          return throwError(()=>{err});
        }
      )
    );
  }
}
