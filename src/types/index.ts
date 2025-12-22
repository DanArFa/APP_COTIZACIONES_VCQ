export interface User {
  ID_USUARIO: number;
  USUARIO: string;
  CONTRASENA: string;
  NOMBRE: string;
  ROL: 'ADMIN' | 'VENT' | 'CLIENTE';
  ACTIVO: 'SI' | 'NO';
}

export interface Precio {
  PRODUCTO: string;
  PRECIO_INSTALADOR: number;
  PRECIO_PUBLICO: number;
  PRECIO_CORTE: number;
}

export interface Proceso {
  PROCESO: string;
  PRECIO_UNIT: number;
}

export interface ProcesoDetalle {
  PROCESO: string;
  CANTIDAD: number;
  PRECIO_UNIT: number;
  IMPORTE: number;
}

export interface Pieza {
  id: string;
  figura: string;
  campos: Record<string, number>;
  cantidad: number;
  procesos: ProcesoDetalle[];
  areaM2: number;
}

export interface Cotizacion {
  ID_COTIZACION: number;
  FECHA: string;
  CLIENTE: string;
  SUBTOTAL: number;
  IVA: number;
  TOTAL: number;
  USUARIO: string;
  ID_USUARIO: number;
  OBSERVACIONES: string;
  APLICAR_IVA: boolean;
  TIPO_PRECIO: 'INSTALADOR' | 'PUBLICO' | 'CORTE';
  PRECIO_UNITARIO: number;
  PRECIO_INSTALADOR: number;
  PRECIO_PUBLICO: number;
  PRECIO_CORTE: number;
  PRODUCTO: string;
  PIEZAS: Pieza[];
  PROCESOS: ProcesoDetalle[];
}

export interface Cliente {
  ID_CLIENTE: string;
  NOMBRE: string;
  TELEFONO: string;
  CORREO: string;
  RFC: string;
  DIRECCION: string;
  NOTAS: string;
}
