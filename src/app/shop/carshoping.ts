import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

var lr:Array<any>=[];
const site = sessionStorage.getItem('carrito');
if (site) {
    lr = JSON.parse(site);
}
export const carrito = lr;
export const carritoSubject = new BehaviorSubject<any[]>(carrito);
export const carrito$ = carritoSubject.asObservable();