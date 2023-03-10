import { Persona } from "./Persona";

export class Fundacion {
    idFundacion?: number;
    ruc!: string;
    nombre_fundacion!: string;
    direccion!: string;
    telefono!: string;
    correo!: string;
    acronimo!: string;
    mision!: string;
    logo!: string;
    estado!: boolean;
    persona!: Persona;
}