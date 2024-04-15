import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errornoauthorizado',
  templateUrl: './errornoauthorizado.component.html',
  styleUrls: ['./errornoauthorizado.component.scss']
})
export class ErrornoauthorizadoComponent implements OnInit{

  ngOnInit(): void {
    this.redireccionar();
  }

  redireccionar(){
 setTimeout(()=>{
  window.location.href = '#'
 },2000);
  }
}
