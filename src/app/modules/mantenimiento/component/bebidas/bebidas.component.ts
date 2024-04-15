import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VProductoUsuario } from '../../models/V-Producto-usuario.model';
import { GenericFilterRequest } from '../../models/generic-filter-request.model';
import { GenericFilterResponse } from '../../models/generic-filter-response.model';
import { VistaproductousurioService } from '../../services/vista-producto-usuario.service';
import { AccioConst } from 'src/app/constant/General-constatn';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {carrito, carrito$, carritoSubject} from 'src/app/shop/carshoping';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.scss']
})
export class BebidasComponent implements OnInit {

  sincompra:boolean = false;
  carrito=carrito;
  preciofinal:string ="";
  //
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
        categoria: [{value : "bebida" , disabled:true}],
    })
    }

  ngOnInit(): void {
   this.filtrar();
   this.mostrarocultar();
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
//////
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
t.forEach(function(t){
    cuenta = cuenta + Number(t);
});
let d = cuenta.toFixed(2);
this.preciofinal = d.toString(); 
}

////////////////////
mostrarocultar(){
  let ocultar = this.carrito;
  let tm = ocultar.length;
  if(tm > 0){
    this.sincompra=true;
  }
}
////
eliminaritem(n:string){
  //para eliminar debemos tener encuenta las pociciones,
  // si pongo 0,1 eliminara 1 elemento de 
  //la pocicion 0, asi que para escoger la posicion cambiar el 0 por la posicion
  // obtener la pocicion
  let name = n;
  console.log(name);
  let posicion = carrito.findIndex(x =>x.nombre == name);
  carrito.splice(posicion,1);
  sessionStorage.removeItem('carrito');
  sessionStorage.setItem('carrito',JSON.stringify(carrito));
   if (carrito.length == 0) {
     console.log("ocultar carrito");
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
  }
  

