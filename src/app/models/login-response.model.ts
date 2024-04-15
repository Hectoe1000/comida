import { ClienteResponse } from "./cliente-response.model";
import { UsuarioLoginResponse } from "./usuario-login-response.models";

export class LoginResponse {
    success: boolean = false;
    mensaje: string = "";
    token: string = "";
    tokenExpira: string ="";
    usuario: UsuarioLoginResponse = new UsuarioLoginResponse();
    cliente: ClienteResponse =new ClienteResponse();
}
