import { Premio } from './../_model/premio';
import { HOST } from './../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PremioService {

  url:string =`${HOST}/premio`;
  
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Premio[]>(this.url);
  }
}
