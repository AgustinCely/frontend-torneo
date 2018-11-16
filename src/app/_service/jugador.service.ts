import { JugadorLocal } from '../_model/jugadorlocal';
import { HOST } from './../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  url:string = `${HOST}/jugador`;
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<JugadorLocal[]>(this.url);
  }
}

