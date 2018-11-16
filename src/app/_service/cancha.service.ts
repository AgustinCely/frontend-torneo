import { Cancha } from './../_model/cancha';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {

  url:string=`${HOST}/cancha`;

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Cancha[]>(this.url);
  }
}
