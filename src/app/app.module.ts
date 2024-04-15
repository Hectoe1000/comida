import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule}from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './modules/auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthInterceptor } from './modules/auth/user/service/auth.interceptor';
import { IndirectionComponent } from './pages/indirection/indirection.component';
import { ErrornoauthorizadoComponent } from './pages/error/errornoauthorizado/errornoauthorizado.component';
import { OcurriounerrorComponent } from './pages/error/ocurriounerror/ocurriounerror.component';
import { GmailComponent } from './pages/gmail/gmail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    IndirectionComponent,
    ErrornoauthorizadoComponent,
    OcurriounerrorComponent,
    GmailComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }