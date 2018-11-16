import { JugadorvisitanteService } from './../../../_service/jugadorvisitante.service';
import { JugadorVi } from './../../../_model/jugadorVisi';
import { map } from 'rxjs/operators';
import { JugadorService } from './../../../_service/jugador.service';
import { RondaService } from './../../../_service/ronda.service';
import { CanchaService } from './../../../_service/cancha.service';
import { ArbitroService } from './../../../_service/arbitro.service';
import { PartidoService } from './../../../_service/partido.service';
import { JugadorLocal } from '../../../_model/jugadorlocal';
import { Ronda } from './../../../_model/ronda';
import { Cancha } from './../../../_model/cancha';
import { Arbitro } from './../../../_model/arbitro';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Partido } from 'src/app/_model/partido';

@Component({
  selector: 'app-partido-edicion',
  templateUrl: './partido-edicion.component.html',
  styleUrls: ['./partido-edicion.component.css']
})
export class PartidoEdicionComponent implements OnInit {

  id:number;
  arbitro: Arbitro[]=[];
  cancha: Cancha[]=[];
  ronda: Ronda[]=[];
  jugador:JugadorLocal[]=[];
  jugadorv:JugadorVi[]=[];
  

  myControlArbitro: FormControl = new FormControl();
  arbitroSeleccionado: Arbitro;
  myControlCancha: FormControl = new FormControl();
  canchaSeleccionado: Cancha;
  myControlRonda: FormControl = new FormControl();
  rondaSeleccionado: Ronda;
  myControlJugador: FormControl = new FormControl();
  jugadorSeleccionado: JugadorLocal;
  myControlJugadorV: FormControl = new FormControl();
  jugadorvSeleccionado: JugadorVi;

  form: FormGroup;
  
  partido:Partido;

  edicion: boolean =false;
  filteredOptionsJugador: Observable<any[]>;
  filteredOptionsJugadorVisi: Observable<any[]>;
  filteredOptionsArbitro: Observable<any[]>;
  filteredOptionsRonda: Observable<any[]>;
  filteredOptionsCancha: Observable<any[]>;

  constructor(private route:ActivatedRoute,private router: Router,private partidoService:PartidoService, private arbitroService:ArbitroService, private canchaService:CanchaService,
    private rondaService: RondaService, private jugadorService: JugadorService, private jugadorvisitanteService:JugadorvisitanteService) { 
      this.form = new FormGroup({
        'id':new FormControl(0),
        'fecha':new FormControl(new Date()),
        'hora':new FormControl(''),
        'arbitro': this.myControlArbitro,
        'cancha': this.myControlCancha,
        'jugadorlocal': this.myControlJugador,
        'jugadorvisitante': this.myControlJugadorV,
        'ronda' : this.myControlRonda
      });
    }

  ngOnInit() {
    this.listarArbitro();
    this.listarCancha();
    this.listarJugador();
    this.listarRonda();
    this.listarJugadorVisitante();

    this.partido = new Partido();
    this.route.params.subscribe((params:Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    })
    this.filteredOptionsJugador = this.myControlJugador.valueChanges.pipe(map(val4 =>this.filterJugador(val4)));
    this.filteredOptionsJugadorVisi = this.myControlJugadorV.valueChanges.pipe(map(val =>this.filterJugadorV(val)));
    this.filteredOptionsArbitro = this.myControlArbitro.valueChanges.pipe(map(val1 =>this.filter(val1)));
    this.filteredOptionsRonda = this.myControlRonda.valueChanges.pipe(map(val2 =>this.filterRonda(val2)));
    this.filteredOptionsCancha = this.myControlCancha.valueChanges.pipe(map(val3 =>this.filterCancha(val3)));
  }

  initForm(){
    if(this.edicion){
      //cargar la data del servicio en el form
      this.partidoService.listarPartidoPorId(this.id).subscribe(data => {
        console.log(data);
        this.form = new FormGroup({
          
          'id' : new FormControl(data.idpartido),
          'fecha' : new FormControl(data.fechainipartido),
          'hora' : new FormControl(data.hora),
          'arbitro' : new FormControl(data.arbitro),
          'cancha' : new FormControl(data.cancha),
          'jugadorvisitante' : new FormControl(data.jugadorvisitante),
          'jugadorlocal' : new FormControl(data.jugadorLocal),
          'ronda' : new FormControl(data.ronda)
        });
      });
    }
  }

  operar(){
    this.partido.idpartido = this.form.value['id'];
    this.partido.fechainipartido = this.form.value['fecha'];
    this.partido.hora = this.form.value['hora'];
    this.partido.arbitro = this.form.value['arbitro'];
    this.partido.cancha = this.form.value['cancha'];
    this.partido.jugadorLocal = this.form.value['jugadorlocal'];
    this.partido.jugadorvisitante = this.form.value['jugadorvisitante'];
    this.partido.ronda = this.form.value['ronda'];

    if(this.edicion){
      //actualizar
      
      this.partidoService.modificar(this.partido).subscribe(data => {
        this.partidoService.listar().subscribe(partido => {
          this.partidoService.partidoCambio.next(partido);
          this.partidoService.mensaje.next('Se modificó');
        });
      });
    }else{
      //registrar
      //console.log(this.partido);
      this.partidoService.registrar(this.partido).subscribe(data => {
        this.partidoService.listar().subscribe(partido => {
          this.partidoService.partidoCambio.next(partido);
          this.partidoService.mensaje.next('Se registró');
        });
      });
    }

    this.router.navigate(['partido']);
  }
  filter(val1: any) {
    if (val1 != null && val1.idArbitro > 0) {
      return this.arbitro.filter(option =>
        option.nombArbitro.toLowerCase().includes(val1.nombres) || option.apeArbitro.toLowerCase().includes(val1.apellidos));
    } else {
      return this.arbitro.filter(option =>
        option.nombArbitro.toLowerCase().includes(val1) || option.apeArbitro.toLowerCase().includes(val1));
    }
  }

  filterCancha(val3: any) {
    if (val3 != null && val3.idCancha > 0) {
      return this.cancha.filter(option =>
        option.nombcancha.toLowerCase().includes(val3.nombres));
    } else {
      return this.cancha.filter(option =>
        option.nombcancha.toLowerCase().includes(val3));
    }
  }

  filterRonda(val2: any) {
    if (val2 != null && val2.idronda > 0) {
      return this.ronda.filter(option =>
        option.descripcionRonda.toLowerCase().includes(val2.nombres));
    } else {
      return this.ronda.filter(option =>
        option.descripcionRonda.toLowerCase().includes(val2));
    }
  }

  filterJugador(val4: any) {
    if (val4 != null && val4.idJugador > 0) {
      return this.jugador.filter(option =>
        option.nombjugadorlocal.toLowerCase().includes(val4.nombres) || option.apejugadorlocal.toLowerCase().includes(val4.apellidos));
    } else {
      return this.jugador.filter(option =>
        option.nombjugadorlocal.toLowerCase().includes(val4) || option.apejugadorlocal.toLowerCase().includes(val4));
    }
  }

  filterJugadorV(val: any) {
    if (val != null && val.idjugadorvisitante > 0) {
      return this.jugadorv.filter(option =>
        option.nombjugadorvisitante.toLowerCase().includes(val.nombres) || option.apejugadorvisitante.toLowerCase().includes(val.apellidos));
    } else {
      return this.jugadorv.filter(option =>
        option.nombjugadorvisitante.toLowerCase().includes(val) || option.apejugadorvisitante.toLowerCase().includes(val));
    }
  }

  displayFnArbitro(val: Arbitro) {
    return val ? `${val.nombArbitro} ${val.apeArbitro}` : val;
  }

  displayFn(val: JugadorLocal) {
    return val ? `${val.nombjugadorlocal} ${val.apejugadorlocal}` : val;
  }

  displayFnV(val: JugadorVi) {
    return val ? `${val.nombjugadorvisitante} ${val.apejugadorvisitante}` : val;
  }

  displayFnRonda(val: Ronda) {
    return val ? `${val.descripcionRonda}` : val;
  }

  displayFnCancha(val: Cancha) {
    return val ? `${val.nombcancha}` : val;
  }

  seleccionarJugador(e: any){
    //console.log(e);
    this.jugadorSeleccionado = e.option.value;
  }

  seleccionarJugadorV(e: any){
    //console.log(e);
    this.jugadorvSeleccionado = e.option.value;
  }

  seleccionarCancha(e: any){
    //console.log(e);
    this.canchaSeleccionado = e.option.value;
  }

  seleccionarRonda(e: any){
    //console.log(e);
    this.rondaSeleccionado = e.option.value;
  }

  seleccionarArbitro(e: any){
    //console.log(e);
    this.arbitroSeleccionado = e.option.value;
  }

  listarJugador() {
    this.jugadorService.listar().subscribe(data => {
      this.jugador = data;
    });
  }
  listarJugadorVisitante() {
    this.jugadorvisitanteService.listar().subscribe(data => {
      this.jugadorv = data;
    });
  }
  
  listarRonda() {
    this.rondaService.listar().subscribe(data => {
      this.ronda = data;
    });
  }

  listarCancha() {
    this.canchaService.listar().subscribe(data => {
      this.cancha = data;
    });
  }

  listarArbitro() {
    this.arbitroService.listar().subscribe(data => {
      this.arbitro = data;
    });
  }
}
