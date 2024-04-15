import { CanActivateFn } from '@angular/router';
import { carrito } from '../shop/carshoping';

export const compraGuard: CanActivateFn = (route, state) => {
  let token=sessionStorage.getItem("token");
  let compra=sessionStorage.getItem("carrito");
  if(!token)
  {
    window.location.href ='/login'
  }
  if (!compra) {
      window.location.href = '/401'
  }if(compra == null){
    window.location.href = '/401'
  }if (carrito.length == 0) {
    window.location.href = '/401'
  }
   return true;
  }
  

