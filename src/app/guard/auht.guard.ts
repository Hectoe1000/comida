import { CanActivateFn} from '@angular/router';

export const auhtGuard: CanActivateFn = (route, state) => {
  
  let token=sessionStorage.getItem("token");
 
  if(!token)
  {
    window.location.href = '/401'
  return false;
  }
  return true;
};
