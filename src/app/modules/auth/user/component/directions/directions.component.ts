import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccioConst, error_inesperado, mensaje_eliminado } from 'src/app/constant/General-constatn';
import { Vdireccion } from 'src/app/modules/mantenimiento/models/V-direccion.model';
import { GenericFilterRequest } from 'src/app/modules/mantenimiento/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/modules/mantenimiento/models/generic-filter-response.model';
import { DireccionService } from 'src/app/modules/mantenimiento/services/direccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements OnInit {

  //
  config = {
    backdrop :true,
    ignoreBackdropClick: true
  };
  us:boolean = true;
  accionModal=AccioConst.edita ;
  modalRef? : BsModalRef;
  //
  userid:string = "";
  direccion:Vdireccion[] = [];
  genericFilterRequest:GenericFilterRequest = new GenericFilterRequest();
  constructor(
    private _direccion:DireccionService,
    private modalService: BsModalService,
  ){}
  
    ngOnInit(): void {
     this.traerdatos();
    }
  
  obtenerdireccion(n:any){
    this.genericFilterRequest.filtros.push({name:"idCliente",value:n});
    this._direccion.genericFilterView(this.genericFilterRequest).subscribe({
     next:(data:GenericFilterResponse<Vdireccion>)=>{
       this.direccion = data.lista;
     },
     error:()=>{
   
     },
     complete:()=>{
      this.validarcantidad();
     },
    });
   }
  
  traerdatos(){
  let user = sessionStorage.getItem('idCliente');
    if(user !== null){
     let n = user;
     console.log(n);
     this.obtenerdireccion(n);
    }
  }
  
  validarcantidad(){
    if (this.direccion.length == 4) {
      let g = document.getElementById('desaparecer')as HTMLElement;
      g.style.display = 'none';
    } else {
      let g = document.getElementById('desaparecer')as HTMLElement;
      g.style.display = 'flex';
    }
  }

  interface_eliminar(id:number)
{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success ms-2",
      cancelButton: "btn btn-danger "
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Estas Seguro?",
    text: "Esta accion no puede rehacerse!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "No, cancelar !",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {

      this.deltedirections(id,true);
    
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelado",
        text: "Mas cuidado la proxima vez",
        icon: "error"
      });
    }
  });

}

deltedirections(id:number, resulth:boolean){
  if(resulth)
  {
    this._direccion.delete(id).subscribe({

     next:(data:number)=>{
       mensaje_eliminado();
     },
      error:()=>{
        error_inesperado();
      },
       complete:()=>{
        window.location.href = 'user/directions';
      }

    })
  }
}

}
  
