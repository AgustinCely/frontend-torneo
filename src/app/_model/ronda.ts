import { Premio } from './premio';
import { Punto } from './punto';

export class Ronda{
    
    public idronda: number;
    public descripcionRonda: string;
    public premio:Premio;
    public puntos: Punto;
}