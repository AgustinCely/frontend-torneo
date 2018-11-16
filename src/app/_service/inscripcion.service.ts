import { HOST } from './../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Inscripciones } from './../_model/inscripciones';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  url:string =`${HOST}/inscripcion`;
  inscripCambio = new Subject<Inscripciones[]>();
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Inscripciones[]>(this.url);
  }

  registrar(inscripciones: Inscripciones){
    return this.http.post(this.url, inscripciones);
  }
}
