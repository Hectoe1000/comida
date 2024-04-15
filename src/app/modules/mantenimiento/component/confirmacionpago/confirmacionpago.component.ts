/// <reference types="@types/googlemaps" />
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccioConst, crear_completa, error_inesperado } from 'src/app/constant/General-constatn';
import { dominio } from 'src/app/constant/url.constants';
import { ClienteserviceService } from 'src/app/modules/auth/user/service/clienteservice.service';
import { GenericFilterRequest } from '../../models/generic-filter-request.model';
import { GenericFilterResponse } from '../../models/generic-filter-response.model';
import { Vcliente } from '../../models/v-cliente.model';
import { Vdireccion } from '../../models/V-direccion.model';
import { DireccionService } from '../../services/direccion.service';
import { DireccionRequest } from '../../models/direccion-request.model';
import { DireccionResponse } from '../../models/direccion-response.model';
import { carrito } from 'src/app/shop/carshoping';
import { MercadoPagoResponsef } from '../../models/mercadopagoresponse.model';
import { MercadoPagoRequestf } from '../../models/mercadopagorequest.model';
import { MercadopagoService } from '../../services/mercadopago.service';
import { Carritopreparado } from '../../models/carrito-antes-compra.model';
import { CompraDetalleRequest } from '../../models/compra-detalle-request.model';
import { PedidoRequest } from '../../models/pedido-request.model';
import { UsuarioResponse } from '../../models/usuario-response.model';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioRequest } from '../../models/usuario-request.model';
import { Router } from '@angular/router';
declare var MercadoPago: any;
declare var google: any; 
interface Configuration {
    ctaTitle: string;
    mapOptions: google.maps.MapOptions;
    capabilities: {
        addressAutocompleteControl: boolean;
        mapDisplayControl: boolean;
        ctaControl: boolean;
    };
}

@Component({
  selector: 'app-confirmacionpago',
  templateUrl: './confirmacionpago.component.html',
  styleUrls: ['./confirmacionpago.component.scss']
})
export class ConfirmacionpagoComponent implements OnInit {

  direccionf: DireccionRequest = new DireccionRequest();
//
  cliente:Vcliente[] = [];
  direccion:Vdireccion[] = [];
  genericFilterRequest:GenericFilterRequest = new GenericFilterRequest();

  //mostra mensaje de falta de direccion
  verdireccion ="";
  //mostar-ocular-añadir direccion
  vadirection = true;
  //
  //mostra ocultar-calculo de ruta
  varruta = true;
  //
  //datos a enviar
  direccionenvio ="";
//
//validciones con mercadopago
idpagomercadopago: MercadoPagoResponsef = new MercadoPagoResponsef();
mercadopagorequestf: MercadoPagoRequestf = new MercadoPagoRequestf();
//
autocomplete!: google.maps.places.Autocomplete;
map!: google.maps.Map;
marker!: google.maps.Marker;
//
//
alert ="";
alert2 ="";
warning1 ="";
//
//
  constructor(
    private modalService: BsModalService,
    private _cliente:ClienteserviceService ,
    private _direccion:DireccionService,
    private _mercados:MercadopagoService,
    private _usuario:UsuarioService,
    private router: Router
  ){}
  //
  ngOnInit(): void {
    this.traerdatos();
    this.initMap();
   }
   //
   initMap(): void {
    const CONFIGURATION: Configuration = {
        ctaTitle: "Guardar Direccion",
        mapOptions: {
            center: { lat: -11.7702246, lng: -75.4992829 },
            fullscreenControl: false,
            mapTypeControl: true,
            streetViewControl: false,
            zoom: 14,
            zoomControl: false,
            maxZoom: 22
        },
        capabilities: {
            addressAutocompleteControl: true,
            mapDisplayControl: true,
            ctaControl: true
        }
    };

    this.map = new google.maps.Map(document.getElementById('gmp-map')!, CONFIGURATION.mapOptions);
    this.marker = new google.maps.Marker({ map: this.map });

    this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('location-input') as HTMLInputElement,
        {
          bounds: {
            north: -11.77048, // Aumenta un poco la latitud hacia el norte
            south: -11.79048, // Disminuye un poco la latitud hacia el sur
            west: -75.49698,  // Disminuye un poco la longitud hacia el oeste
            east: -75.47698   // Aumenta un poco la longitud hacia el este
        },
        componentRestrictions: { country: 'PE'},
         types: ['address']
        }
    ); 

    this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace();
        if (!place.geometry) {
            window.alert(`No details available for input: '${place.name}'`);
            return;
        }
        this.renderAddress(place);
        this.fillInAddress(place);
    });
}
fillInAddress(place: google.maps.places.PlaceResult): void {
  if (place.address_components) {
    console.log(place.address_components);
      for (const component of place.address_components) {
          switch (component.types[0]) {           
              case 'route':
                let lroute = document.getElementById('location-input') as HTMLInputElement;
                  if (lroute) {
                     lroute.value = component.long_name;
                     this.direccionf.calle = component.long_name;
                  }
              break;
              case 'street_number':              
              let locationInput = document.getElementById('street_number') as HTMLInputElement;
              if (locationInput) {
                  locationInput.value = component.long_name;
                  this.direccionf.numero =Number(component.long_name);
              }
              break;    
              case 'locality':
                  // Asignar el valor de la localidad al campo correspondiente
                  let localityInput = document.getElementById('locality-input') as HTMLInputElement;
                  if (localityInput) {
                      localityInput.value = component.long_name;
                  }
                  break;
              case 'administrative_area_level_1':
                  // Asignar el valor del estado/provincia al campo correspondiente
                  let adminAreaInput = document.getElementById('administrative_area_level_1-input') as HTMLInputElement;
                  if (adminAreaInput) {
                      adminAreaInput.value = component.long_name;
                  }
                  break;
                  case 'administrative_area_level_2':
                  // Asignar el valor del estado/provincia al campo correspondiente
                  let AreaInput = document.getElementById('distrito') as HTMLInputElement;
                  if (AreaInput) {
                      AreaInput.value = component.long_name;
                      this.direccionf.distrito = component.long_name;                 
                  }
                  break;
                  case 'country':
                    // Asignar el valor del código postal al campo correspondiente
                    let countryInput = document.getElementById('country-input') as HTMLInputElement;
                    if (countryInput) {
                        countryInput.value = component.long_name;
                    }
                    break;   
                    case 'postal_code':
                    // Asignar el valor del código postal al campo correspondiente
                    let postalcode = document.getElementById('postal_code-input') as HTMLInputElement;
                    if (postalcode) {
                        postalcode.value = component.long_name;
                    }
                    break;   
              // Puedes agregar más casos según sea necesario para otros componentes de dirección
              default:
                  break;
          }
      }
  }
}
renderAddress(place: google.maps.places.PlaceResult): void {
    if (place.geometry && place.geometry.location) {
        this.map.setCenter(place.geometry.location);
        this.marker.setPosition(place.geometry.location);
    } else {
        this.marker.setPosition(null);
    }
}
ver(){
  if (this.direccionf.distrito == "") {
      console.log('no hay datos');
      this.warning1 ="Ingresa una direccion";
  } else {
      this.warning1 ="";
      if (this.direccionf.distrito == "Jauja") {
          this.alert2="";
         this.validardatos();
      } else {
          this.alert2 ="La direccion debe ser dentro de Jauja";
      }
  }
}

quitarmarca(){
this.warning1 = "";
this.alert = "";
}

validardatos(){
let refer = document.getElementById('referencias')as HTMLInputElement;
let dato = refer.value;
this.direccionf.referencia = dato;
if (this.direccionf.referencia == "" ) {
  console.log('falta una referencia');
  this.alert ="Falta la referencia"
} else {
  this.crearRegistro();
}
}
crearRegistro()
{
  this._direccion.create(this.direccionf).subscribe({
    next:(data:DireccionResponse)=>{
      crear_completa();
    },
    error:()=>{
      error_inesperado();
    },
    complete:()=>{
      setTimeout(() => {
        this.router.navigate(['/compralista']);
      },1000);
    }
   })
}
   //
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
    this.preciototal();
   },
  });
 }

 obtenerdireccion(n:any){
  this.genericFilterRequest.filtros.push({name:"idCliente",value:n});
  this._direccion.genericFilterView(this.genericFilterRequest).subscribe({
   next:(data:GenericFilterResponse<Vdireccion>)=>{
     this.direccion = data.lista;
     console.log(this.direccion);
   },
   error:()=>{
 
   },
   complete:()=>{
    this.controldemostrar();
   },
  });
 }

traerdatos(){
let user = sessionStorage.getItem('idCliente');
  if(user !== null){
   let n = user;
   this.direccionf.idCliente = Number(user);
   this.obtenerCliente(n);
   this.obtenerdireccion(n);
  }
}
 ///funcion para mostrar modal
  accionModal=AccioConst.edita ;
  modalRef? : BsModalRef;
  config = {
    backdrop :true,
    ignoreBackdropClick: true
  };
  mostrarruta(template: TemplateRef<any>){
    this.sacardireccion();
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
///
sacardireccion(){
  let f = document.getElementById('fg')as HTMLSelectElement;
  if (f) {
    let t = f.value;
    this.direccionenvio = t.toString();
    this.verdireccion = "";
  } else {
    this.direccionenvio = "null";
    this.verdireccion = "Registre su direccion, es necesario";
  }
}
//
validadionpreviopago(){
  this.sacardireccion();
  if (this.direccionenvio == "" || this.direccionenvio == null || this.direccionenvio == "null" ) {
    this.verdireccion = "Registre su direccion, es necesario";
  } else {
  this.traerusuarios();
    let btnprevio = document.getElementById('botonantes')as HTMLElement;
    btnprevio.style.display = "none";
    let btnpago = document.getElementById('wallet_container')as HTMLElement;
    btnpago.style.display = "flex";
  }

}

controldemostrar(){
if (this.direccion.length > 0) {
  let m = document.getElementById('mapadesaparecer')as HTMLElement;
  m.style.display = "none";
  this.vadirection = false;
  this.varruta = false;
}
}

// traer datos de carrito de sesion storage
carrito=carrito;
preciofinal:string ="";
preciototal(){
  let t = this.carrito.map(d => d.precio);
  let cuenta = 0;
  t.forEach(function(t){
      cuenta = cuenta + Number(t);
  });
  let d = cuenta.toFixed(2);
  this.preciofinal = d.toString(); 
  console.log('el metodo apunto de ser lansado');
  this.traeriddepago();
  }

///mercado pago trabajo
traeriddepago()
{
 let sb = Number(this.preciofinal)
 this.mercadopagorequestf.preciofinal = sb;
 this.mercadopagorequestf.email = this.cliente[0].email;
 this.mercadopagorequestf.lastname = this.cliente[0].apPaterno+' '+this.cliente[0].apMaterno;
 this.mercadopagorequestf.name = this.cliente[0].nombre;
 this.mercadopagorequestf.numberdni = this.cliente[0].nroDocumento.toString();
  this._mercados.enviardatopreviopago(this.mercadopagorequestf).subscribe({
    next:(data:MercadoPagoResponsef)=>{
      this.idpagomercadopago = data;
    },
    error:()=>{
      error_inesperado();
    },
    complete:()=>{
      this.mercadopago();
    }
   })
}
mercadopago(): void{
  const mp = new MercadoPago('TEST-6024f49a-9c3d-45fe-9000-4a1df347cc72');
  const bricksBuilder = mp.bricks();
  bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
          preferenceId:this.idpagomercadopago.idpreferencia,
      },
      customization: {
          texts: {
              valueProp: 'smart_option',
          },
      },
  });
}
//
//recibir respuesta y guardar en base de  datos
detailshop:Array<any>=[];
//
subirinformacionasesionstorage(){
  let dt = this.detailShopExists();
  if (dt == false) {
    sessionStorage.setItem('detailshop',JSON.stringify(this.detailshop));
  } else {
    console.log('lla existe un elemento, no pudes tener 2 por sesion, completa tu primera compra primero');
  }
}
detailShopExists(): boolean {
  const detailShop = sessionStorage.getItem('detailshop');
  return detailShop !== null && detailShop !== '';
}
//
//construir metodo para enviar el pedido
listpedidosesion : PedidoRequest[] =[];
subirpedido(){

let ped : PedidoRequest = new PedidoRequest();

ped.delivery = true;
ped.idDireccion = this.direccion[0].idDireccion;
ped.idUsuario = this.cliente[0].idCliente;
ped.idUsuario = this.idusuario;
console.log(ped);
this.detailshop.push({
  
  idPedido: ped.idPedido,
  fecha : ped.fecha,
  delivery: ped.delivery,
  idDireccion:ped.idDireccion,
  idUsuario:ped.idUsuario
});
this.subirinformacionasesionstorage();
}
//
userenviar:UsuarioRequest = new UsuarioRequest();
idusuario: number = 0;
traerusuarios()
{
 this.userenviar.contrasena = this.cliente[0].contra; 
 this.userenviar.email = this.cliente[0].email;
  this._usuario.filtro(this.userenviar).subscribe({
   next:(data:number)=>{
     this.idusuario = data;
   },
   error:()=>{
 
   },
   complete:()=>{
    this.subirpedido();
   },
  });

}

}
