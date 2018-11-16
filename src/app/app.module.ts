import { TorneoEdicionComponent } from './pages/torneo/torneo-edicion/torneo-edicion.component';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscripcionComponent } from './pages/inscripcion/inscripcion.component';
import { TorneoComponent } from './pages/torneo/torneo.component';
import { PartidoComponent } from './pages/partido/partido.component';
import { PartidoEdicionComponent } from './pages/partido/partido-edicion/partido-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    InscripcionComponent,
    TorneoComponent,
    TorneoEdicionComponent,
    PartidoComponent,
    PartidoEdicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
