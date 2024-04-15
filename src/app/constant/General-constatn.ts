import Swal from "sweetalert2";

export const AccioConst={

    crear:1,
    edita:2,
    eliminar:3
}

export function alert_success(title:string,timer?:number,text?:string)
{
    Swal.fire({
        icon: "success",
        title: title,
        text: text,
        timer: timer
      });
}

export function alert_warning(title:string,text:string)
{
    Swal.fire({
        icon: "error",
        title: title,
        text: text
   
      });
}

export function alert_error(title:string,timer?:number,text?:string)
{
    Swal.fire({
        icon: "error",
        title: title,
        text: text,
        timer: timer
      });
}
export function mensaje_eliminado(){

    Swal.fire({
        title: "Eliminado!",
        text: "Se a eliminado correctamente",
        icon: "success"
      });
}
export function edicion_completa(){

    Swal.fire({
        title: "Editado!",
        text: "Se han guardado los cambios",
        icon: "success"
      });
}
export function crear_completa(){

    Swal.fire({
        title: "Creado!",
        text: "Se a añadido correctamente",
        icon: "success"
      });
}
export function error_inesperado(){

    Swal.fire({
        title: "Error!",
        text: "Ocurrio un error no esperado",
        icon: "error"
      });
}


