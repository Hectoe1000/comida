import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VProductoUsuario } from '../../models/V-Producto-usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SugerenciaService } from '../../services/sugerencia.service';
import {carrito, carritoSubject} from 'src/app/shop/carshoping';

@Component({
  selector: 'app-modalproducto',
  templateUrl: './modalproducto.component.html',
  styleUrls: ['./modalproducto.component.scss']
})
export class ModalproductoComponent {
  @Input() accion:number=0;
  @Input() pro:number=0;
  @Input() producto:VProductoUsuario[]=[];
  @Output() closeModalEmmit=new EventEmitter<boolean>();

  //
  value = 1 ;
  //
carrito = carrito;
constructor(
 private fb:FormBuilder,
 private _productoService:SugerenciaService,
){
  this.myForm=this.fb.group({
   })
}
infoProducto:VProductoUsuario[]=[];
myForm:FormGroup;
title:string="";
 ngOnInit(): void{
 this.traerdatosporid();
 }

traerdatosporid(){
let a = this.producto.filter(item => item.idProducto == this.pro);
this.infoProducto = a;
}
 guardar(i:number){
  let p = this.value;
 let f = this.infoProducto.filter(x => x.idProducto == i);
 let name = f.map(name => name.nombre);
 let idpro = f.map(name => name.idProducto);
 let precio = f.map(precio => precio.precio);
let nb = carrito.findIndex(x =>x.nombre == name);
let imagen = f.map(imagen => imagen.imagen);
let total = Number(precio) * Number(p) ;
//validacion de existencia de producto
 if (nb == -1 ) {
  let r = Number(p);
  this.carrito.push({
    nombre:name.toString(),
    precio:total.toString(),
    img:imagen.toString(),
    cantidad:Number(p),
    c1:r,
    t1:total,
    id:Number(idpro),
    preciounitario:precio.toString()
  })
  sessionStorage.setItem('carrito',JSON.stringify(carrito));
 } else {
  let total2 = carrito[nb]['t1'] + total;
  let c = carrito[nb]['c1'] + Number(p);
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
 }
 carritoSubject.next(carrito);
this.cerrarModal(false);
}

 cerrarModal(res:boolean){
  this.closeModalEmmit.emit(res); 
 }
 increment() {
  if (this.value < 10) {
    this.value++;
  }
}

decrement() {
  if (this.value > 1) {
    this.value--;
  }
}



}
