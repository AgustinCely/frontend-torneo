import { Ciudad } from './../_model/ciudad';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  url:string=`${HOST}/ciudad`;
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Ciudad[]>(this.url);
  }
}
