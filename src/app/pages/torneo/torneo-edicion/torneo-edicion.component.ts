import { map } from 'rxjs/operators';
import { Torneo } from './../../../_model/torneo';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DirectorService } from './../../../_service/director.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Director } from './../../../_model/director';
import { Component, OnInit } from '@angular/core';
import { TorneoService } from 'src/app/_service/torneo.service';

@Component({
  selector: 'app-torneo-edicion',
  templateUrl: './torneo-edicion.component.html',
  styleUrls: ['./torneo-edicion.component.css']
})
export class TorneoEdicionComponent implements OnInit {

  id:number;
  directores:Director[]=[];
  form: FormGroup;
  myControlDirector: FormControl = new FormControl();
  directorSeleccionado: Director;
  edicion: boolean =false;
  filteredOptions: Observable<any[]>;
  torneo: Torneo;

  constructor(private route:ActivatedRoute,private router: Router,private torneoService:TorneoService,private directorService:DirectorService) { 
    this.form = new FormGroup({
      'id':new FormControl(0),
      'nombreTorneo': new FormControl(''),
      'descripcionTorneo': new FormControl(''),
      'f_iniTorneo': new FormControl(new Date()),
      'f_finTorneo': new FormControl(new Date()),
      'cantidadJugadores': new FormControl(''),
      'director': this.myControlDirector,
    });
  }

  ngOnInit() {
    this.listarDirector();
    this.torneo = new Torneo();
    this.route.params.subscribe((params:Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    })
    this.filteredOptions = this.myControlDirector.valueChanges.pipe(map(val =>this.filter(val)));
  }
  initForm(){
    if(this.edicion){
      //cargar la data del servicio en el form
      this.torneoService.listarTorneoPorId(this.id).subscribe(data => {
        //console.log(data.fecha)
        this.form = new FormGroup({
          'id' : new FormControl(data.idTorneo),
          'nombreTorneo' : new FormControl(data.nombreTorneo),
          'descripcionTorneo' : new FormControl(data.descripcionTorneo),
          'f_iniTorneo' : new FormControl(data.f_iniTorneo),
          'f_finTorneo' : new FormControl(data.f_finTorneo),
          'cantidadJugadores': new FormControl(data.cantidadJugadores),
          'director' : new FormControl(data.director)
        });
      });
    }
  }

  operar(){
    this.torneo.idTorneo = this.form.value['id'];
    this.torneo.nombreTorneo = this.form.value['nombreTorneo'];
    this.torneo.descripcionTorneo = this.form.value['descripcionTorneo'];
    this.torneo.f_iniTorneo = this.form.value['f_iniTorneo'];
    this.torneo.f_finTorneo = this.form.value['f_finTorneo'];
    this.torneo.cantidadJugadores = this.form.value['cantidadJugadores'];
    this.torneo.director = this.form.value['director'];
    /*var tzoffset = (this.form.value['fecha']).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    this.Signosvitales.fecha = localISOTime;*/
    //console.log(this.Signosvitales.fecha);
    if(this.edicion){
      //actualizar
      
      this.torneoService.modificar(this.torneo).subscribe(data => {
        this.torneoService.listar().subscribe(Signosvitales => {
          this.torneoService.torneoCambio.next(Signosvitales);
          this.torneoService.mensaje.next('Se modificó');
        });
      });
    }else{
      //registrar
      console.log(this.torneo)
      this.torneoService.registrar(this.torneo).subscribe(data => {
        this.torneoService.listar().subscribe(Signosvitales => {
          this.torneoService.torneoCambio.next(Signosvitales);
          this.torneoService.mensaje.next('Se registró');
        });
      });
    }

    this.router.navigate(['torneo']);
  }

  filter(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.directores.filter(option =>
        option.nombreDirector.toLowerCase().includes(val.nombres));
    } else {
      return this.directores.filter(option =>
        option.nombreDirector.toLowerCase().includes(val));
    }
  }
  seleccionarDirector(e: any){
    //console.log(e);
    this.directorSeleccionado = e.option.value;
  }
  displayFn(val: Director) {
    return val ? `${val.nombreDirector}` : val;
  }

  listarDirector() {
    this.directorService.listar().subscribe(data => {
      this.directores = data;
    });
  }
}
