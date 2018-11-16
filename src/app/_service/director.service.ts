import { Director } from './../_model/director';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  url:string=`${HOST}/director`;

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Director[]>(this.url);
  }
}
