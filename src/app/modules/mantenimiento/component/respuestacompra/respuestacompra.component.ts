import { Component, OnInit } from '@angular/core';
import { MercadoResponse } from '../../models/MercadoResponse.model';
import { IdvistapagosService } from '../../services/idvistapagos.service';
import { AngularResponsePago } from '../../models/respuestamercadoangularesponse.model';
import { Carritopreparado } from '../../models/carrito-antes-compra.model';
import { CompraDetalleRequest } from '../../models/compra-detalle-request.model';
import { carrito } from 'src/app/shop/carshoping';
import { PedidoRequest } from '../../models/pedido-request.model';
import { PedidoService } from '../../services/pedido.service';
import { PedidoResponse } from '../../models/pedido-response.model';
import { CompraDetalleService } from '../../services/compra-detalle.service';
import { CompraDetalleResponse } from '../../models/compra-detalle-response.model';
import { PedidoDetallepagoService } from '../../services/pedido-detallepago.service';
import { PedidoDetallePagoRequest } from '../../models/pedidoDetallepago-request.model';
import { PedidoDetallePagoResponse } from '../../models/pedidoDetallepago-response.model';
import { MovimientoCajaService } from '../../services/movimiento-caja.service';
import { MovimientoCajaRequest } from '../../models/movimientoCaja-request.model';
import { MovimientoCajaResponse } from '../../models/movimientoCaja-response.model';
import { GmailRequest } from '../../models/gmail-request.models';
import { GmailService } from '../../services/gmail.service';
import { Vdireccion } from '../../models/V-direccion.model';
import { GenericFilterResponse } from '../../models/generic-filter-response.model';
import { DireccionService } from '../../services/direccion.service';
import { GenericFilterRequest } from '../../models/generic-filter-request.model';
import { ClienteserviceService } from 'src/app/modules/auth/user/service/clienteservice.service';
import { Vcliente } from '../../models/v-cliente.model';

@Component({
  selector: 'app-respuestacompra',
  templateUrl: './respuestacompra.component.html',
  styleUrls: ['./respuestacompra.component.scss']
})
export class RespuestacompraComponent implements OnInit {

  carrlst:Carritopreparado[]=[];
  listaCompraDetalle: CompraDetalleRequest[] = [];
  mercado:MercadoResponse = new MercadoResponse();
  vistapago:AngularResponsePago = new AngularResponsePago();
  cliente:Vcliente[] = [];

  constructor(
    private mercadoservice: IdvistapagosService,
    private _pedido:PedidoService,
    private _compradetalle:CompraDetalleService,
    private _pedidodetallepago:PedidoDetallepagoService,
    private _movimientocaja:MovimientoCajaService,
    private _gmail:GmailService,
    private _direccion:DireccionService,
    private _cliente:ClienteserviceService
  ){}

  ngOnInit(): void {
    this.filtrado();
  }

  obtenerMercado(fg:number){
    this.mercadoservice.filter(fg).subscribe({
     next:(data:MercadoResponse)=>{
      this.mercado = data;
     },
     error:()=>{
   
     },
     complete:()=>{
      this.informaciondepago();
     },
    });
   }

   detailShopExists(): boolean {
    const detailShop = sessionStorage.getItem('detailshop');
    return detailShop !== null && detailShop !== '';
  }

   filtrado() {
    let user = sessionStorage.getItem('idCliente');
    if (user !== null) {
       let detailcompra = this.detailShopExists();
      if ( detailcompra == true) {
        this.obtenerdireccion(user);
        this.obtenerCliente(user);
        this.revisardatosantesdeguardar();
      } else {
        console.log('no existe la varibale detail esperada');
        window.location.href = '/401';
      }
    } else {
      console.log('No se ha iniciado sesión de ningún tipo');
      window.location.href = '/401';
    }
}

revisardatosantesdeguardar(){
  let user = sessionStorage.getItem('idCliente');
    if (user !== null) {
     let n = parseInt(user);
      this.obtenerMercado(n);
    }else{
      window.location.href = '/401';
    }
}

informaciondepago(){
let duran = this.mercado.descripcionmercado;
let enviar = Number(duran);
this.estadopago(enviar);
}


estadopago(hb:number){
  this.mercadoservice.getall(hb).subscribe({
    next:(data:AngularResponsePago)=>{
     this.vistapago = data;
    },
    error:()=>{
  
    },
    complete:()=>{
    this.validacionpreviofinal();
    },
   });

}
//
carrito=carrito;
preciofinal:number = 0;
validacionpreviofinal(){
  let t = this.carrito.map(d => d.precio);
  let cuenta = 0;
  t.forEach(function(t){
      cuenta = cuenta + Number(t);
  });
  let d = cuenta.toFixed(2);
  this.preciofinal = Number(d); 
//
let datocompar = this.vistapago.unitPrice;
if (datocompar == this.preciofinal) {
this.validacionfinal();
} else {
  window.location.href = '/error';
  console.log('el precio de compra no coincide con el precio pagado');
}
}

validacionfinal(){

if (this.vistapago.status == "approved") {

  if (this.vistapago.statusDetail == "accredited") {
    this.creaciondepedido();
    } else {
    console.log('parece que ubo un error en el pago');
   let succes = document.getElementById('succes')as HTMLElement;
    succes.style.display = "none";
   let error = document.getElementById('error')as HTMLElement;
    error.style.display = "flex";
  }
} else {
  console.log('parece que ubo un error en el pago');
  let succes = document.getElementById('succes')as HTMLElement;
  succes.style.display = "none";
  let error = document.getElementById('error')as HTMLElement;
  error.style.display = "flex";
}
}
//
detailshop:PedidoRequest[]=[];
pedidores:PedidoResponse = new PedidoResponse();
creaciondepedido(){
 let pedidoaenviar:PedidoRequest = new PedidoRequest();
 let pedidosesion = sessionStorage.getItem('detailshop');
 if(pedidosesion){
  this.detailshop = JSON.parse(pedidosesion);
  pedidoaenviar.idPedido = this.detailshop[0].idPedido;
  pedidoaenviar.delivery = this.detailshop[0].delivery;
  pedidoaenviar.fecha = this.obtenerFechaActual();
  pedidoaenviar.idDireccion = this.detailshop[0].idDireccion;
  pedidoaenviar.idUsuario = this.detailshop[0].idUsuario;

  console.log(pedidoaenviar);

  this._pedido.create(pedidoaenviar).subscribe({
    next:(data:PedidoResponse)=>{
        this.pedidores = data;
    },
    error:()=>{
  
    },
    complete:()=>{
    this.creaciondetallepedido();
    },
   });

 } 
}
//
obtenerFechaActual() {
   // Obtener la fecha actual
   const fechaActual = new Date();

   // Obtener los componentes de la fecha
   const año = fechaActual.getFullYear();
   const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
   const dia = fechaActual.getDate().toString().padStart(2, '0');
   const horas = fechaActual.getHours().toString().padStart(2, '0');
   const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
   const segundos = fechaActual.getSeconds().toString().padStart(2, '0');
   const milisegundos = fechaActual.getMilliseconds().toString().padStart(3, '0');
 
   // Construir la cadena con la fecha en el formato ISO 8601
   const fechaFormateada = `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}.${milisegundos}Z`;
 
   return fechaFormateada;
}
//
creaciondetallepedido(){
//
let nt = sessionStorage.getItem('carrito');
    if (nt) {
      this.carrlst = JSON.parse(nt);
      for(let index=0; index < carrito.length;index++){
      // Crear un nuevo objeto CompraDetalleRequest
           let nuevoDetalle: CompraDetalleRequest = new CompraDetalleRequest();
           nuevoDetalle.idProducto = Number(this.carrlst[index]['id']);
           nuevoDetalle.cantidad = Number(this.carrlst[index]['cantidad']);
           nuevoDetalle.precioUnitario = Number(this.carrlst[index]['preciounitario']);
           nuevoDetalle.subTotal = Number(this.carrlst[index]['precio']);
           nuevoDetalle.idPedido = this.pedidores.idPedido;
           nuevoDetalle.idCompraDetalle = 0;      
     // Agregar el nuevo objeto a la lista
     this.listaCompraDetalle.push(nuevoDetalle);
      }
    } 
//recorrer lista para guardarlos uno a uno 
    this._compradetalle.insertmultiple(this.listaCompraDetalle).subscribe({
      next:(data:CompraDetalleResponse[])=>{
      },
      error:()=>{
    
      },
      complete:()=>{
       this.crearpedidodetallepago();
      },
     });
}
//
pagoresponse:PedidoDetallePagoResponse = new PedidoDetallePagoResponse();
crearpedidodetallepago(){
this.traermetododepago();
let detalpay : PedidoDetallePagoRequest = new PedidoDetallePagoRequest();
detalpay.idPedidoDetallePago = 0;
detalpay.idPedido = this.pedidores.idPedido;
detalpay.idMedioPago = this.id_medio_pago;
detalpay.montoPago = this.vistapago.unitPrice;

this._pedidodetallepago.create(detalpay).subscribe({
  next:(data:PedidoDetallePagoResponse)=>{
    this.pagoresponse=data;
  },
  error:()=>{

  },
  complete:()=>{
  this.creacionmovimientopago();
  },
 });

}
//
id_medio_pago:number = 0;
traermetododepago(){
  
  if(this.vistapago.paymentTypeId == 'debit_card'){
      this.id_medio_pago = 2;
  }if(this.vistapago.paymentTypeId == 'credit_card'){
      this.id_medio_pago = 1;
  }
}

creacionmovimientopago(){
 let movimien:MovimientoCajaRequest = new MovimientoCajaRequest();
  movimien.idMovimintoCaja = 0;
  movimien.idCaja = 1;
  movimien.idPedidoDetallePago = this.pagoresponse.idPedidoDetallePago;

  this._movimientocaja.create(movimien).subscribe({
    next:(data:MovimientoCajaResponse)=>{
    },
    error:()=>{
  
    },
    complete:()=>{
    this.enviaremailcliente();
    },
   });
}
enviaremailcliente(){
  let d:GmailRequest = new GmailRequest();
  let direc = this.direccion[0].calle + " "+ this.direccion[0].numero + " "+ this.direccion[0].distrito;
  let name = this.direccion[0].nombre + " "+ this.direccion[0].apPaterno + " "+ this.direccion[0].apMaterno;
  d.direccion = direc.toString();
  d.dni = this.cliente[0].nroDocumento;
  d.email =this.cliente[0].email;
  d.fecha  = this.obtenerFechaActualet();
  d.monto = this.pagoresponse.montoPago.toString();
  d.nombre = name.toString();
  d.pedido = this.detailshop[0].idPedido.toString();
  this._gmail.gmail(d).subscribe({
    next:()=>{},
    error:()=>{},
    complete:()=>{},
   });
   this.borrarcredenciales();
}
obtenerFechaActualet() {
  // Obtener la fecha actual
  const fechaActual = new Date();
  
  // Obtener el desplazamiento horario en minutos
  const desplazamientoHorarioMinutos = fechaActual.getTimezoneOffset();
  
  // Ajustar la fecha para el desplazamiento horario
  fechaActual.setMinutes(fechaActual.getMinutes() - desplazamientoHorarioMinutos);

  // Formatear la fecha en el formato requerido
  const fechaFormateada = fechaActual.toISOString().split('.')[0] + '-05:00';
  
  return fechaFormateada;
}

borrarcredenciales(){
  sessionStorage.removeItem('detailshop');
  sessionStorage.removeItem('carrito');
 window.location.href = "#";
}

direccion:Vdireccion[] = [];
genericFilterRequest:GenericFilterRequest = new GenericFilterRequest();

obtenerdireccion(n:any){
  this.genericFilterRequest.filtros.push({name:"idCliente",value:n});
  this._direccion.genericFilterView(this.genericFilterRequest).subscribe({
   next:(data:GenericFilterResponse<Vdireccion>)=>{
     this.direccion = data.lista;
   },
   error:()=>{
 
   },
   complete:()=>{

   },
  });
 }

  //
  obtenerCliente(n:any){

    this.genericFilterRequest.filtros.push({name:"idCliente",value:n});
  
    this._cliente.genericFilterView(this.genericFilterRequest).subscribe({
     next:(data:GenericFilterResponse<Vcliente>)=>{
       this.cliente = data.lista;
     },
     error:()=>{
   
     },
     complete:()=>{
     
     },
    });
   }

}
