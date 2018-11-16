import { TorneoService } from './../../_service/torneo.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Torneo } from './../../_model/torneo';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.css']
})
export class TorneoComponent implements OnInit {

  dataSource: MatTableDataSource<Torneo>
  displayedColumns = ['idTorneo', 'nombreTorneo', 'descripcionTorneo','f_iniTorneo','f_finTorneo','cantidadJugadores','director', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(private torneoService:TorneoService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.torneoService.torneoCambio.subscribe(data=> {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.torneoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.torneoService.mensaje.subscribe(data=>{
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /*mostrarMas(e : any){
    console.log(e);
    this.torneoService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
    let signos = JSON.parse(JSON.stringify(data)).content;
    this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

    this.dataSource= new MatTableDataSource(signos);
    this.dataSource.sort = this.sort;
    });
  }*/
}
