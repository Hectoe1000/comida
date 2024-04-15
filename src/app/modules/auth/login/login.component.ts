import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/login-response.model';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../service/auth.service';
import { alert_success, crear_completa, error_inesperado } from 'src/app/constant/General-constatn';
import { ClienteResponse} from '../../../models/cliente-response.model';
import { ClienteService } from '../../mantenimiento/services/cliente.service';
import { TipoDocumentoService } from '../../mantenimiento/services/tipo-documento.service';
import { TipoDocumentoResponse } from '../../mantenimiento/models/tipodocumento-response.model';
import { BusquedadniService } from '../user/service/busquedadni.service';
import { busquedadni } from 'src/app/models/busquedadni.model';
import { ClienteRequest } from 'src/app/models/cliente-request.model';
import { UsuarioRequest } from '../../mantenimiento/models/usuario-request.model';
import { UsuarioService } from '../../mantenimiento/services/usuario.service';
import { UsuarioResponse } from '../../mantenimiento/models/usuario-response.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

mensaje:String ="";
mensaje1:String ="";
mensaje2:String="";
estadogmail:boolean=false;
loginForm:FormGroup;
registroForm:FormGroup;
clienteEnvio:ClienteRequest=new ClienteRequest();
loginRequest:LoginRequest= new LoginRequest();
tipodocumentos:TipoDocumentoResponse[] = [];
enviardni:busquedadni=new busquedadni();
datorecojo:ClienteResponse=new ClienteResponse();
listo:ClienteResponse=new ClienteResponse();
datosdevuelta:ClienteResponse = new ClienteResponse();
//
constructor(
   private _fb:FormBuilder,
   private _authservice:AuthService,
   private _clienteService:ClienteService,
   private _busqueda:BusquedadniService,
   private _tiposdocumento:TipoDocumentoService,
   private _router:Router,
   private _usuario:UsuarioService
){
   this.loginForm=this._fb.group({
      email:[null,[Validators.required, Validators.email]],
      contrasena:[null,[Validators.required]],
   }),
    this.registroForm=this._fb.group({
      idCliente: [{value : 0 , disabled:true},[Validators.required]],
      nombre: [{value:this.datorecojo.nombre,disabled:true},[Validators.required,Validators.pattern('^[a-zA-Z]{1,25}$')]],
      apPaterno:  [{value:this.datorecojo.apPaterno,disabled:true},[Validators.required,Validators.pattern('^[a-zA-Z]{1,12}$')]],
      apMaterno:  [{value:this.datorecojo.apMaterno,disabled:true},[Validators.required,Validators.pattern('^[a-zA-Z]{1,12}$')]],
      celular:  [null,[Validators.required,Validators.pattern('^[0-9]{9}$')]],
      email:[null,[Validators.required, Validators.email]],
      idTipoDocumento:[{value:this.enviardni.tipoDocumento},[Validators.required]],
      nroDocumento:  [null,[Validators.required,Validators.pattern('^[0-9]{8}$')]],
      contra: [null],
    })
}
 
ngOnInit(): void {
  this.obtenerTipoDocumento();
}
login(){
   console.log(this.loginForm.getRawValue());
   //este login request lo tengo que enviar asia el servicio web
   this.loginRequest=this.loginForm.getRawValue();
   
   this._authservice.login(this.loginRequest).subscribe({

    next:(data:LoginResponse)=>{
          console.log(data);
          this._router.navigate(['']);
     
         //NOSOTROS ALMACENAMOS EL VALORT DEL TOKEN Y ALGUNOS VALORES DE NUESTROS USUARIOS
         //PARA SESSION STORAGE 
        if(data.success)
        {
          console.log("login correcto");
          sessionStorage.setItem("token",data.token);
          sessionStorage.setItem("username",data.cliente.nombre);
          sessionStorage.setItem("userlast",data.cliente.apPaterno);
          sessionStorage.setItem("idCliente",data.usuario.idUsuario.toString());
       }
       else{
         alert("email o contra incorrectos")
        return;
   //     this._router.navigate(['auth']);
   //     alert('error fatal');
       }
    },
     error:(err) =>{},
     complete:() =>{} 
   });
 }
 ///seccion para crear el registro del cliente
 crearRegistro(n:string,id:number)
  {
   this.clienteEnvio = this.registroForm.getRawValue();
   this.clienteEnvio.contra = n;
   this.clienteEnvio.idTipoDocumento = id;
   this.clienteEnvio.nombre = this.datorecojo.nombre;
   this.clienteEnvio.apPaterno =this.datorecojo.apPaterno;
   this.clienteEnvio.apMaterno = this.datorecojo.apMaterno;

    if (this.estadogmail == true) {
      console.log('todo funcionara correctamente');
      
    } else {
      console.log('esto esta mal, el email es completamente invalido');
      
    }
    this._clienteService.create(this.clienteEnvio).subscribe({
      next:(data:ClienteResponse)=>{
        this.datosdevuelta = data;
      },
      error:()=>{
        error_inesperado();
      },
      complete:()=>{
         //aqui se creara el nuevo usuario
         this.crearusuarionuevo();
        alert_success('bienvenido a Komparte',3000,'Su cuenta se ha creado satisfactoriamente');
       }
      
     });
   this.registroForm.reset();
setTimeout(() => {
  this.prueba2();
}, 2000);
  }
 ///
  d: boolean = true;
  b: boolean = true;
  prueba(){
    var b = document.getElementById('b');
    if (b !== null) {
       b.style.width  ='50%';
       b.style.transition = '2s';
    }
    var a =document.getElementById('a');
    if (a !== null) {
       a.style.width  ='0%';
       a.style.transition = '2s';
    }

    var c =document.getElementById('c');
    if (c !== null) {
       c.style.width  ='50%';
       c.style.transition = '2s';
    }
    var btn = document.getElementById('loginbtn');
    if(btn !== null){
        btn.style.display = 'none';
    };
    var d = document.getElementById('mu');
    if(d !== null){
      d.style.display = 'block';
    }
    this.d = false;
    this.b = false;
    setTimeout(
      ()=>{this.b = true},
      2000
      );
  }
  crearusuarionuevo(){
    let d :UsuarioRequest = new UsuarioRequest();
    d.contrasena = this.datosdevuelta.contra;
    d.email = this.datosdevuelta.email;

    this._usuario.create(d).subscribe({
      next:(data:UsuarioResponse)=>{
      },
      error:()=>{
    
      },
      complete:()=>{
      
      },
     });

  }
  prueba2(){
    var b = document.getElementById('b');
    if (b !== null) {
       b.style.width  ='50%';
       b.style.transition = '2s';
    }
    var a =document.getElementById('a');
    if (a !== null) {
       a.style.width  ='50%';
       a.style.transition = '2s';
    }
    var btn = document.getElementById('loginbtn');
    if(btn !== null){
        btn.style.display = '';
    };
    var c =document.getElementById('c');
    if (c !== null) {
       c.style.width  ='0%';
       c.style.transition = '2s';
    }
    this.d = true;
    this.b = false;
    setTimeout(
      ()=>{this.b = true},
      2000
      );
  }
  //
  obtenerTipoDocumento(){

   this._tiposdocumento.getall().subscribe({
    next:(data:TipoDocumentoResponse[])=>{
      this.tipodocumentos=data;
    },
    error:()=>{
  
    },
    complete:()=>{
  
    },
   });
  }

  comprobarcrendeciales(){
    let ctn1 = document.getElementById('contra1')as HTMLInputElement;
    let dato1;
    let dato2;
    if(ctn1){
       dato1 = ctn1.value;
      }
  let ctn2 = document.getElementById('contra2')as HTMLInputElement;
  if(ctn2)
  {
    dato2 = ctn2.value;
  }
  let da = document.getElementById('tipodocumento')as HTMLInputElement;
  let idtipodocumento = da.value;
  if (dato1 == dato2) {
    if(dato2){
      this.mensaje  = "";
      let pasword = dato2.toString();
      this.crearRegistro(pasword,Number(idtipodocumento));
    }else{
      this.mensaje  = "Debes de completar ambos campos";
    }
  }else{
    this.mensaje  = "Las contraseñas no coindiden";
  }
  }
  //funcion para traer los datos mandando un dni
  traerpordni(){
    let dato1 = document.getElementById('tipodocumento')as HTMLInputElement;
    let dato2 = document.getElementById('numerodocumento')as HTMLInputElement;
    let tipo = dato1.value;
    let m = this.tipodocumentos.filter(y => y.idTipoDocumento == Number(tipo));
    let tipodocumento = m.map(x =>x.descripcion);
    let number = dato2.value;
      if (number.toString() !== '') {    
        let d = number.toString().length;
        if (d < 9) {
          this.mensaje1 = "";
       this.enviardni.tipoDocumento = tipodocumento.toString(); 
      this.enviardni.nroDocumento = number.toString();
      this._busqueda.busqueda(this.enviardni).subscribe({
        next:(data:ClienteResponse)=>{
          this.datorecojo = data;
        },
        error:()=>{
          console.log('funciono todo mal');
        },
        complete:()=>{
          console.log('funciono todo bien');
         }
       });
        } else {
          this.mensaje1 = "El dni solo tiene 8 numeros";
        }
    } else {
      this.mensaje1="su identificacion es necesaria";
    }
  }
  
//validacion por correo
gmailprueba(){
  let nu = document.getElementById('emailprueba')as HTMLInputElement;
  let gmail = nu.value;
  const options = {method: 'GET'};
  if (gmail.toString() == null || gmail.toString() == '') {
    console.log(gmail +'is null');
  } else {
    fetch('https://api.hunter.io/v2/email-verifier?email='+gmail.toString()+'&api_key=0d60b5e90c5c2071e8463c67d82b1279fd927d74', options)
    .then(response => response.json())
    .then(response => this.validarexistenciagmail(response.data.status,response.data.score))
    .catch(err => console.error(err));
    }
  }
  validarexistenciagmail(estado:string,score:number){
    if (estado == 'valid' && score >50) {
      this.estadogmail=true;
      this.mensaje2='';
    } else {
      this.mensaje2='porfavor, ingrese un email valido, no temporal o inexistente';
    }
  }

}
