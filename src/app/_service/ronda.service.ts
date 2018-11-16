import { Ronda } from './../_model/ronda';
import { HOST } from './../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RondaService {

  url:string =`${HOST}/ronda`;

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Ronda[]>(this.url);
  }
}
