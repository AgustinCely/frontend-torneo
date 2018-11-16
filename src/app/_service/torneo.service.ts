import { Subject } from 'rxjs';
import { HOST } from './../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Torneo } from '../_model/torneo';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {

  url:string =`${HOST}/torneo`;
  torneoCambio = new Subject<Torneo[]>();
  mensaje = new Subject<string>();
  
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Torneo[]>(this.url);
  }
  listarTorneoPorId(id: number){
    
    return this.http.get<Torneo>(`${this.url}/${id}`);
  }
  modificar(torneo: Torneo){
    return this.http.put(this.url, torneo);
  }

  registrar(torneo: Torneo){
    return this.http.post(this.url, torneo);
  }
}
