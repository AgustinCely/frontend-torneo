import { TorneoEdicionComponent } from './pages/torneo/torneo-edicion/torneo-edicion.component';
import { PartidoEdicionComponent } from './pages/partido/partido-edicion/partido-edicion.component';
import { TorneoComponent } from './pages/torneo/torneo.component';
import { PartidoComponent } from './pages/partido/partido.component';
import { InscripcionComponent } from './pages/inscripcion/inscripcion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'inscripcion', component:InscripcionComponent},
  {
    path: 'partido', component: PartidoComponent, children:[
      {path:'nuevo',component: PartidoEdicionComponent},
      {path:'edicion/:id',component: PartidoEdicionComponent}
  ]},
  {
    path:'torneo',component: TorneoComponent, children:[
     {path:'nuevo',component: TorneoEdicionComponent},
     {path:'edicion/:id',component:TorneoEdicionComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
