import { Subject } from 'rxjs';
import { Partido } from './../_model/partido';
import { HOST } from './../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  url:string =`${HOST}/partido`;
  partidoCambio = new Subject<Partido[]>();
  mensaje = new Subject<string>();
  
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Partido[]>(this.url);
  }

  listarPartidoPorId(id: number){
    return this.http.get<Partido>(`${this.url}/${id}`);
  }

  registrar(partido: Partido){
    return this.http.post(this.url, partido);
  }

  modificar(partido: Partido){
    return this.http.put(this.url, partido);
  }
  listarPageable(p: number, s: number){
    return this.http.get<Partido[]>(`${this.url}/pageable?page=${p}&size=${s}`);
  }
}
