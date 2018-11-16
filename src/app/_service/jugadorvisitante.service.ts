import { JugadorVi } from './../_model/jugadorVisi';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JugadorvisitanteService {

  url:string = `${HOST}/jugadorvisitante`;
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<JugadorVi[]>(this.url);
  }
}
