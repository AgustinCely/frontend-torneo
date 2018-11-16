import { Arbitro } from './../_model/arbitro';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService {

  url: string =`${HOST}/arbitro`;
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Arbitro[]>(this.url);
  }
}
