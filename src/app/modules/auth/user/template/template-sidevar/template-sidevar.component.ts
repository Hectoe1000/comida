import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-sidevar',
  templateUrl: './template-sidevar.component.html',
  styleUrls: ['./template-sidevar.component.scss']
})
export class TemplateSidevarComponent implements OnInit {


  name:string ="";
  ngOnInit(): void {
    this.traerdatos();
  }

  traerdatos(){
    let user = sessionStorage.getItem('username')
    let ap = sessionStorage.getItem('userlast');
      if(user !== null){
        this.name = user.toString();
        this.name = this.name + " " + ap?.toString();
      }
    }


//
cerrarsesion(){
  sessionStorage.clear();
}
}
