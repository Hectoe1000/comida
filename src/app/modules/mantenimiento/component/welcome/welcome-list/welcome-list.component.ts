import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VProductoUsuario } from '../../../models/V-Producto-usuario.model';
import { GenericFilterRequest } from '../../../models/generic-filter-request.model';
import { GenericFilterResponse } from '../../../models/generic-filter-response.model';
import { VistaproductousurioService } from '../../../services/vista-producto-usuario.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccioConst } from 'src/app/constant/General-constatn';
import {carrito, carrito$, carritoSubject } from 'src/app/shop/carshoping';

@Component({
  selector: 'app-welcome-list',
  templateUrl: './welcome-list.component.html',
  styleUrls: ['./welcome-list.component.scss']
})
export class WelcomeListComponent implements OnInit {
  
  //metodo para ver pedidos
carritovistanumber = " Carrito";
  //
sincompra:boolean = false;
carrito = carrito;
preciofinal:string ="";
 //
  us:boolean = true;
  username:string ="";
  config = {
    backdrop :true,
    ignoreBackdropClick: true
  };
  vusuarioProducto:VProductoUsuario[]=[];
  totalItems:number = 0;
  itemsPerPage:number = 8;
  myFormFilter: FormGroup;
  genericFilterRequest:GenericFilterRequest = new GenericFilterRequest();
  ProductoSeleted:VProductoUsuario[]=[];
  accionModal=AccioConst.edita ;
  producto:VProductoUsuario = new VProductoUsuario();
  modalRef? : BsModalRef;
  
  //obtener de manera no optima 

  constructor( 
    private fb:FormBuilder,
    private productoUsuarioService:VistaproductousurioService,
    private modalService: BsModalService,
    )
    {
      this.myFormFilter=this.fb.group({
        categoria: [{value : "ofertas" , disabled:true}],
    })
    }

  ngOnInit(): void {
   this.filtrar();
   this.obtenernombreuser();
   this.recorrermuestra();
   carrito$.subscribe(() => {
    this.preciototal();
  });
  }

filtrar()
{
  let valueForm  = this.myFormFilter.getRawValue();
  
  this.genericFilterRequest.filtros.push({name:"categoria",value:valueForm.categoria});

  this.productoUsuarioService.genericFilterView(this.genericFilterRequest).subscribe({
    next:(data:GenericFilterResponse<VProductoUsuario>) => {
      this.vusuarioProducto = data.lista;
      this.totalItems = data.totalRegistros;
      this.ProductoSeleted = data.lista;
    },
    error:() => {
      console.log("error");
    }, 
    complete:() => {
      console.log("completo");
    },

  })
}

comprarProducto(template: TemplateRef<any>,th:number){
  this.producto.idProducto =  th;
  this.accionModal = AccioConst.crear;
  this.openModal2(template);
}
openModal2(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, Object.assign({},{class: "gray modal-lg"}, this.config));
}

getCloseModalEmmit(res:boolean)
{
    this.modalRef?.hide();
    if(res)
    {
    }
}
obtenernombreuser(){
  let user = sessionStorage.getItem('username');
  let ap = sessionStorage.getItem('userlast');
  if(user !== null){
    this.us = false;
   this.username = user.toString();
   this.username = this.username + " " + ap?.toString();
  }

 }
 ctn:number = 0;
 desplegaropciones(){

  if (this.ctn == 0) {
    let op = document.getElementById('optionsesion');
    if (op !== null) {
      op.style.display = 'block';
    }
    this.ctn++;
  } else {
    let op = document.getElementById('optionsesion');
    if (op !== null) {
      op.style.display = 'none';
    }
    this.ctn--;
  }
 }
//
cerrarsesion(){
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('userlast');
  sessionStorage.removeItem('idCliente');
  location.reload();
}
//////////////////

mostrarcarrito(){
  let g  = document.getElementById('general')as HTMLElement;
  let c = document.getElementById('carrito')as HTMLElement;
  let ct = document.getElementById('contecarr')as HTMLElement;
  let btncar = document.getElementById('btncar')as HTMLElement;
  if(g !== null){
    btncar.style.visibility = 'hidden';
    g.style.width = '80%';
    g.style.pointerEvents = 'none';
    c.style.width = '20%';
    c.style.transition = '1.5s';
    g.style.transition = '1.5s';
    setTimeout(function(){ct.style.display = 'block'}, 500);
  }
} 
ocultarcarrito(){
  let g  = document.getElementById('general')as HTMLElement;
  let c = document.getElementById('carrito')as HTMLElement;
  let ct = document.getElementById('contecarr')as HTMLElement;
  let btncar = document.getElementById('btncar')as HTMLElement;
  if(g !== null){
    g.style.width = '100%';
    g.style.pointerEvents = '';
    c.style.width = '0%';
    g.style.transition = '1s';
    ct.style.display = 'none';
    setTimeout(function(){btncar.style.visibility = 'visible';}, 500);
  }
}
//funcion enviar carrito
preciototal(){
let t = this.carrito.map(d => d.precio);
let cuenta = 0;
let i = 0;
t.forEach(function(t){
    cuenta = cuenta + Number(t);
    i++;
});
let d = cuenta.toFixed(2);
this.preciofinal = d.toString();
  if (i == 0) {
    this.carritovistanumber = " Carrito";
  } else {
    if (i < 10) {
      this.carritovistanumber = " ";
      this.carritovistanumber = i.toString()+" "+"Producto";
      
      } else{
        this.carritovistanumber = " ";
        this.carritovistanumber = i.toString()+" "+"Productos";
      } 
  }
}


eliminaritem(n:string){
//para eliminar debemos tener encuenta las pociciones,
// si pongo 0,1 eliminara 1 elemento de 
//la pocicion 0, asi que para escoger la posicion cambiar el 0 por la posicion
// obtener la pocicion
let name = n;
let posicion = carrito.findIndex(x =>x.nombre == name);
carrito.splice(posicion,1);
sessionStorage.removeItem('carrito');
sessionStorage.setItem('carrito',JSON.stringify(carrito));
 if (carrito.length == 0) {
   this.ocultarcarrito();
   this.sincompra=false;
   this.recorrermuestra();
 }
 carritoSubject.next(carrito);
}
setintervalo:any;
recorrermuestra(){
  this.setintervalo = setInterval(()=>this.lk(),1000);
}
lk(){
  if (carrito.length > 0) {
    this.sincompra=true;
    clearTimeout(this.setintervalo);
   }else{};
}
//enviar datos para la compra
enviardatoscompra(){
  console.log('el carrito estara enviando datos');
}
}







