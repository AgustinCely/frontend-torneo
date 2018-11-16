import { JugadorVi } from './jugadorVisi';
import { JugadorLocal } from './jugadorlocal';
import { Cancha } from './cancha';
import { Arbitro } from './arbitro';
import { Ronda } from './ronda';

export class Partido{

    public idpartido: number;
    public fechainipartido: string;
    public hora: string;
    public arbitro: Arbitro;
    public cancha:Cancha;
    public jugadorLocal:JugadorLocal;
    public jugadorvisitante: JugadorVi;
    public ronda:Ronda;
}