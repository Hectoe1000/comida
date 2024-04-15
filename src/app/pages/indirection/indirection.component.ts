import { Component, OnInit } from '@angular/core';
declare const google: any; 
@Component({
  selector: 'app-indirection',
  templateUrl: './indirection.component.html',
  styleUrls: ['./indirection.component.scss']
})
export class IndirectionComponent implements OnInit{

  ngOnInit(): void {
    this.initMap();
  }
  initMap(): void {
    // Aquí puedes inicializar el mapa de Google
    const map = new google.maps.Map(document.getElementById("mapa"), {
      center: { lat: -11.77652359008789, lng: -75.49992370605469 },
      zoom: 14,
      mapId: "DEMO_MAP_ID"
    });

    new google.maps.Marker({
      position: { lat: -11.77652359008789, lng: -75.49992370605469 },
      map,
      title: "Mi ubicación"
    });
  }
}
