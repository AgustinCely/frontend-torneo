import { HOST } from './../_shared/var.constant';
import { Punto } from './../_model/punto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PuntoService {

  url:string =`${HOST}/premio`;

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Punto[]>(this.url);
  }
}
