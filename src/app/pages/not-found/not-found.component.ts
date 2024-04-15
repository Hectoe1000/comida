import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit{

tamaño(){
var a = document.getElementById('not');
var b = screen.height.valueOf();
if(a){
  a.style.backgroundColor = 'black';
  a.style.marginTop = '-2rem';
  b = b - 129;
  a.style.height = b.toString()+'px';
  a.style.padding = '2rem'
}
}
  ngOnInit(): void {
    this.tamaño();
  }
}
