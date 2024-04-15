import { Component, OnInit, TemplateRef } from '@angular/core';
import { VProductoUsuario } from '../../mantenimiento/models/V-Producto-usuario.model';
import { SugerenciaService } from '../../mantenimiento/services/sugerencia.service';
import { AccioConst } from 'src/app/constant/General-constatn';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { carrito, carrito$ } from 'src/app/shop/carshoping';

@Component({
  selector: 'app-template-navbar',
  templateUrl: './template-navbar.component.html',
  styleUrls: ['./template-navbar.component.scss']
})
export class TemplateNavbarComponent implements OnInit {

    //metodo para ver pedidos
carritovistanumber = " Carrito";
carrito = carrito;
preciofinal:string ="";
  //
  us:boolean = true;
  username:string ="";
  config = {
    backdrop :true,
    ignoreBackdropClick: true
  };

  modalRef? : BsModalRef
  titleModal:string = "";
  image:string ="";
  ProductoSeleted:VProductoUsuario[]=[];
  producto:VProductoUsuario = new VProductoUsuario();
  accionModal=AccioConst.edita ;
  fil: string = "";
  nombreproducto: { nombre: string, imagen: string ,id:number }[] = [];
  productosFiltrados: { nombre: string, imagen: string ,id:number }[] = [];

  constructor(
    private productoUsuarioService: SugerenciaService,
    private modalService: BsModalService,
    ) { }

  ngOnInit(): void {
    this.filtrar();
    this.obtenernombreuser();
    carrito$.subscribe(() => {
      this.preciototal();
    });
  }

  filtrar() {
    this.productoUsuarioService.getall().subscribe({
      next: (data: VProductoUsuario[]) => {
        this.ProductoSeleted = data;
        this.nombreproducto = data.map(producto => ({ nombre: producto.nombre, imagen: producto.imagen, id:producto.idProducto }));
      },
      error: () => {
        console.log("error");
      },
      complete: () => {
        console.log("completo");
      },
    });
  }

  probando() {
    let valor = (document.getElementById("filtro") as HTMLInputElement)?.value.toLowerCase();
    if (valor === "") {
      this.productosFiltrados = [];
      this.ocultarBarra();
    } else {
      this.productosFiltrados = this.nombreproducto.filter(producto => producto.nombre.toLowerCase().includes(valor));
      this.mostrarBarra();
    }
  }

  comprarProducto(template: TemplateRef<any>,th:number){
    this.producto.idProducto =  th;
    this.accionModal = AccioConst.crear;
    this.openModal2(template);
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({},{class: "gray modal-lg"}, this.config));
  }
  mostrarBarra() {
    var barra = document.getElementById("miBarra") as HTMLUListElement;
    barra.style.display = "block";
  }

  ocultarBarra() {
    var barra = document.getElementById("miBarra") as HTMLUListElement;
    barra.style.display = "none";
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
//
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
//////
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




}
