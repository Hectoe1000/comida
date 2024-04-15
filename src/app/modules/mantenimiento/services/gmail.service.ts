import { Injectable } from '@angular/core';
import { GmailRequest } from '../models/gmail-request.models';
import { urlConstants } from 'src/app/constant/url.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  constructor(
    private  _http:HttpClient
   ) {}
   
   gmail(request:GmailRequest)
   {
     return this._http.post(urlConstants.gmail,request);
   }

}
