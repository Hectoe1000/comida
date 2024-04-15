import { CanActivateFn } from '@angular/router';

export const compralistaGuard: CanActivateFn = (route, state) => {
  let token=sessionStorage.getItem("token");
  let compra=sessionStorage.getItem("carrito");
  let revisar=sessionStorage.getItem("detailshop");
  if(!token)
  {
    if (!compra) {
      if (!revisar) {
        window.location.href = '/401'
      }
      return false;
    }
  return false;
  }
  return true;
};
