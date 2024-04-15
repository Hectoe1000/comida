import { Component, OnInit } from '@angular/core';
import { carrito, carrito$, carritoSubject } from 'src/app/shop/carshoping';
import { VistaproductousurioService } from '../../services/vista-producto-usuario.service';
import { VProductoUsuario } from '../../models/V-Producto-usuario.model';
import { CompraDetalleRequest } from '../../models/compra-detalle-request.model';
import { Carritopreparado } from '../../models/carrito-antes-compra.model';

@Component({
  selector: 'app-bolsacompra',
  templateUrl: './bolsacompra.component.html',
  styleUrls: ['./bolsacompra.component.scss']
})
export class BolsacompraComponent implements OnInit {

  //
  ctd=1;
  idps=0;
  //
  vproducto:VProductoUsuario[] = [];
  infoProducto:VProductoUsuario[]=[];
  carrlst:Carritopreparado[]=[];
  listaCompraDetalle: CompraDetalleRequest[] = [];
  //
boton:boolean=true;
ocultar:boolean=true;
preciofinal:string ="";
 carrito=carrito;
  ngOnInit(): void {
    this.comprobar();
    this.obtenerPrecio();
    carrito$.subscribe(() => {
      this.preciototal();
    });
  }

  constructor(
    private _producto:VistaproductousurioService,
  ){}
  obtenerPrecio(){
    this._producto.getall().subscribe({
     next:(data:VProductoUsuario[])=>{
       this.vproducto=data;
       console.log(this.vproducto);
       
     },
     error:()=>{
     },
     complete:()=>{
     },
    });
   }

  preciototal(){
    let t = this.carrito.map(d => d.precio);
    let cuenta = 0;
    t.forEach(function(t){
        cuenta = cuenta + Number(t);
    });
    let d = cuenta.toFixed(2);
    this.preciofinal = d.toString(); 
    }
    eliminaritem(n:number){
      //para eliminar debemos tener encuenta las pociciones,
      // si pongo 0,1 eliminara 1 elemento de 
      //la pocicion 0, asi que para escoger la posicion cambiar el 0 por la posicion
      // obtener la pocicion
      let idt = n;
      console.log(name);
      let posicion = carrito.findIndex(x =>x.id == idt);
      carrito.splice(posicion,1);
      sessionStorage.removeItem('carrito');
      sessionStorage.setItem('carrito',JSON.stringify(carrito));
       if (carrito.length == 0) {
          this.ocultar = false;
          this.ocultarpase();
       }
       carritoSubject.next(carrito);
      }
  
      ocultarpase(){
        let s = document.getElementById('btnpass');
        if(s){
            s.style.display = 'none';
        }
      }
    comprobar(){
      if(carrito.length == 0){
        this.ocultarpase();
        this.ocultar = false;
      }
    }

    aumentar(n:number){
    this.obtenerporid(n);
    let name = this.infoProducto.map(name => name.nombre);
    let idpro = this.infoProducto.map(name => name.idProducto);
    let precio = this.infoProducto.map(precio => precio.precio);
   let nb = carrito.findIndex(x =>x.nombre == name);
   let imagen = this.infoProducto.map(imagen => imagen.imagen);
   let total = Number(precio) * Number(this.ctd);
    //
    let total2 = carrito[nb]['t1'] + total;
    let c = carrito[nb]['c1'] + Number(this.ctd);
    if(Number(c) > 10){
      this.desabilitar('ctplus');
     }else{
      this.carrito.splice(nb,1,{
        nombre:name.toString(),
        precio:total2.toString(),
        img:imagen.toString(),
        cantidad:Number(c),
        c1:c,
        t1:total2,
        id:Number(idpro),
        preciounitario:precio.toString()
      })
      sessionStorage.removeItem('carrito');
      sessionStorage.setItem('carrito',JSON.stringify(carrito));
     carritoSubject.next(carrito);
     }
    }

    disminuir(n:number){
    this.obtenerporid(n);
    let name = this.infoProducto.map(name => name.nombre);
    let idpro = this.infoProducto.map(name => name.idProducto);
    let precio = this.infoProducto.map(precio => precio.precio);
   let nb = carrito.findIndex(x =>x.nombre == name);
   let imagen = this.infoProducto.map(imagen => imagen.imagen);
   let total = Number(precio) * Number(this.ctd);
    let total2 = carrito[nb]['t1'] - total;
    let c = carrito[nb]['c1'] - Number(this.ctd);
    if(Number(c) < 1){
        this.desabilitar('ctminus');
    }else{
      this.carrito.splice(nb,1,{
        nombre:name.toString(),
        precio:total2.toString(),
        img:imagen.toString(),
        cantidad:Number(c),
        c1:c,
        t1:total2,
        id:Number(idpro),
        preciounitario:precio.toString()
      })
      sessionStorage.removeItem('carrito');
      sessionStorage.setItem('carrito',JSON.stringify(carrito));
      console.log('funciono?');
      carritoSubject.next(carrito);
     }
    }
    obtenerporid(gt:number){
      let a = this.vproducto.filter(item => item.idProducto == gt);
      this.infoProducto = a;
    }

desabilitar(t:string){
   const b = document.getElementById(t)as HTMLButtonElement;
   b.disabled = true;
   console.log('se ha desabilitado');
   }

}
