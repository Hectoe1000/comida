/// <reference types="@types/googlemaps" />
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Vcliente } from 'src/app/models/v-cliente.model';
import { Vdireccion } from 'src/app/modules/mantenimiento/models/V-direccion.model';
import { GenericFilterRequest } from 'src/app/modules/mantenimiento/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/modules/mantenimiento/models/generic-filter-response.model';
import { ClienteserviceService } from '../../service/clienteservice.service';
import { DireccionRequest } from 'src/app/modules/mantenimiento/models/direccion-request.model';
import { DireccionService } from 'src/app/modules/mantenimiento/services/direccion.service';
import { alert_error, crear_completa, error_inesperado } from 'src/app/constant/General-constatn';
import { DireccionResponse } from 'src/app/modules/mantenimiento/models/direccion-response.model';
import { Router, RouterLink } from '@angular/router';
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
  selector: 'app-directionsnew',
  templateUrl: './directionsnew.component.html',
  styleUrls: ['./directionsnew.component.scss']
})
export class DirectionsnewComponent implements OnInit {

direccion: DireccionRequest = new DireccionRequest();
///
  autocomplete!: google.maps.places.Autocomplete;
  map!: google.maps.Map;
  marker!: google.maps.Marker;
//
alert ="";
alert2 ="";
warning1 ="";
//
direcciong:Vdireccion[] = [];
//
genericFilterRequest:GenericFilterRequest = new GenericFilterRequest();
constructor( 
   private _direccionesService:DireccionService,
  ){}
//
  ngOnInit(): void {
      this.initMap();
      this.traerid();
  }

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
                       this.direccion.calle = component.long_name;
                    }
                break;
                case 'street_number':              
                let locationInput = document.getElementById('street_number') as HTMLInputElement;
                if (locationInput) {
                    locationInput.value = component.long_name;
                    this.direccion.numero =Number(component.long_name);
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
                        this.direccion.distrito = component.long_name;                 
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
traerid(){
    let user = sessionStorage.getItem('idCliente');
    if(user !== null){
     this.direccion.idCliente = Number(user);
    }
  }
  ver(){
    if (this.direccion.distrito == "") {
        console.log('no hay datos');
        this.warning1 ="Ingresa una direccion";
    } else {
        this.warning1 ="";
        if (this.direccion.distrito == "Jauja") {
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
this.direccion.referencia = dato;
if (this.direccion.referencia == "" ) {
    console.log('falta una referencia');
    this.alert ="Falta la referencia"
} else {
    this.crearRegistro();
}
}
  crearRegistro()
  {
    this._direccionesService.create(this.direccion).subscribe({
      next:(data:DireccionResponse)=>{
        crear_completa();
      },
      error:()=>{
        error_inesperado();
      },
      complete:()=>{
        setTimeout(() => {
            window.location.href = 'user/directions';
        },1000);
      }
     })
  }


}
