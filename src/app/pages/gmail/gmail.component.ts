import { Component, OnInit } from '@angular/core';
import { GmailRequest } from 'src/app/modules/mantenimiento/models/gmail-request.models';
import { GmailService } from 'src/app/modules/mantenimiento/services/gmail.service';

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.scss']
})
export class GmailComponent implements OnInit {

  ngOnInit(): void {
    this.traerdireccion();
  }

  constructor(
    private _gmail:GmailService
  ){

  }
  traerdireccion(){

    let d:GmailRequest = new GmailRequest();
    d.direccion = "AV los jardines";
    d.dni = 82323434;
    d.email ="marco@gmail.com"
    d.fecha  = this.obtenerFechaActual();
    d.monto = "29.00";
    d.nombre = "NADIE CASAS YER";
    d.pedido = "4";
  
    this._gmail.gmail(d).subscribe({
      next:()=>{
      },
      error:()=>{
    
      },
      complete:()=>{
      },
     });
  }
  obtenerFechaActual() {
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
}
