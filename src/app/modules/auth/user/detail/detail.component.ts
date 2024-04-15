import { Component, OnInit } from '@angular/core';
import { ClienteserviceService } from '../service/clienteservice.service';
import { GenericFilterResponse } from 'src/app/modules/mantenimiento/models/generic-filter-response.model';
import { Vcliente } from 'src/app/models/v-cliente.model';
import { GenericFilterRequest } from 'src/app/modules/mantenimiento/models/generic-filter-request.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

userid:string = "";
cliente:Vcliente[] = [];
genericFilterRequest:GenericFilterRequest = new GenericFilterRequest();
constructor(
  private _cliente:ClienteserviceService ,
){}

  ngOnInit(): void {
   this.traerdatos();
  }

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

traerdatos(){
let user = sessionStorage.getItem('idCliente');
  if(user !== null){
   let n = user;
   this.obtenerCliente(n);
  }
}

}
