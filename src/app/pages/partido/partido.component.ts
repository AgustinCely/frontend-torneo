import { PartidoService } from './../../_service/partido.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Partido } from 'src/app/_model/partido';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {

  dataSource: MatTableDataSource<Partido>;
  displayedColumns = ['idpartido', 'fechainipartido', 'hora', 'arbitro','cancha','jugadorLocal','jugadorvisitante','ronda','acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(private partidoService:PartidoService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.partidoService.partidoCambio.subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.partidoService.mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.partidoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
      
  }
  mostrarMas(e : any){
    console.log(e);
    this.partidoService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
    let partido = JSON.parse(JSON.stringify(data)).content;
    this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

    this.dataSource= new MatTableDataSource(partido);
    this.dataSource.sort = this.sort;
    });
  }
}
