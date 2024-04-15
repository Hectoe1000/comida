/// <reference types="@types/googlemaps" />
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Vdireccion } from '../../models/V-direccion.model';
import { GenericFilterRequest } from '../../models/generic-filter-request.model';
import { GenericFilterResponse } from '../../models/generic-filter-response.model';
import { DireccionService } from '../../services/direccion.service';

@Component({
  selector: 'app-modalrutas',
  templateUrl: './modalrutas.component.html',
  styleUrls: ['./modalrutas.component.scss']
})
export class ModalrutasComponent implements OnInit {
  @Input()  direccion ="";
  @Output() closeModalEmmit=new EventEmitter<boolean>();
//
totaldistancia="";
genericFilterRequest:GenericFilterRequest = new GenericFilterRequest();
direccionf:Vdireccion[] = [];
direccionold:Vdireccion[] = [];
//
constructor(
  private _direccion:DireccionService,
) { }

  ngOnInit(): void {
    this.traerdatos();
  }
//
traerdatos(){
  let user = sessionStorage.getItem('idCliente');
    if(user !== null){
     let n = user;
     this.obtenerdireccion(n);
    }
  }
//
direciondestino="";
mostrarporid(){
this.direccionf = this.direccionold.filter(b => b.idDireccion === Number(this.direccion));
if(this.direccionf ){
  let r = this.direccionf[0].calle + ' ' +this.direccionf[0].numero + ','+' '+  this.direccionf[0].distrito +' '+ '12601';
this.direciondestino = r.toString();
this.initMap();
}
}
calcular(n:string){
  let matchResult = n.match(/\d+/);
  if (matchResult !== null) {
      let numeroExtraido = parseInt(matchResult[0]);
      let valorASumar = 5;
      let resultado = numeroExtraido + valorASumar;
      this.totaldistancia = resultado.toString();
  }else{}
}
//
obtenerdireccion(n:any){
  this.genericFilterRequest.filtros.push({name:"idCliente",value:n});
  this._direccion.genericFilterView(this.genericFilterRequest).subscribe({
   next:(data:GenericFilterResponse<Vdireccion>)=>{
     this.direccionold = data.lista;
   },
   error:()=>{
 
   },
   complete:()=>{
    this.mostrarporid();
   },
  });
 }
//
  initMap(): void {
    const bounds = new google.maps.LatLngBounds();
    const markersArray: google.maps.Marker[] = [];
    const map = new google.maps.Map(document.getElementById("map")!, {});
    // initialize services
    const geocoder = new google.maps.Geocoder();
    const directionsService = new google.maps.DirectionsService(); 
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    // build request
    const originAddress = "Komparte Cafe, Jr. Ayacucho N°992, Jauja 12601";
    const destinationAddress = this.direciondestino;

    // Geocode origin and destination addresses
    Promise.all([
      this.geocodeAddress(geocoder, originAddress),
      this.geocodeAddress(geocoder, destinationAddress)
    ]).then(([origin, destination]) => {
      const request: google.maps.DirectionsRequest = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      // get directions
      directionsService.route(request, (result, status) => {
        if (status == 'OK') {
          directionsRenderer.setDirections(result);
          const distance = result.routes[0].legs[0].distance!.text;
          const duration = result.routes[0].legs[0].duration!.text;
          const responseElement = document.getElementById("response");
          if (responseElement) {
            responseElement.innerText = `Distancia: ${distance}, Tiempo de viaje: ${duration}`;
            this.calcular(duration);
          }
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

      // show markers on map
      this.addMarker(map, origin, "Origin", markersArray);
      this.addMarker(map, destination, "Destination", markersArray);
    }).catch(error => {
      console.error('Error geocoding addresses:', error);
    });
  }

  addMarker(map: google.maps.Map, location: google.maps.LatLng, label: string, markersArray: google.maps.Marker[]): void {
    const marker = new google.maps.Marker({
      map: map,
      position: location,
      label: label
    });
    markersArray.push(marker);
  }

  geocodeAddress(geocoder: google.maps.Geocoder, address: string): Promise<google.maps.LatLng> {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          resolve(results[0].geometry.location);
        } else {
          reject("Geocode was not successful for the following reason: " + status);
        }
      });
    });
  }

  cerrarModal(res:boolean): void {
    this.closeModalEmmit.emit(res); 
  }
}
