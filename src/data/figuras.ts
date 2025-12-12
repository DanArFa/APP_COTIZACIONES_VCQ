export type TipoFigura =
  | 'RECTANGULO'
  | 'CUADRADO'
  | 'CIRCULO'
  | 'TRIANGULO'
  | 'OVALO'
  | 'TRAPECIO'
  | 'ROMBO'
  | 'PENTAGONO'
  | 'HEXAGONO'
  | 'HEPTAGONO'
  | 'OCTAGONO'
  | 'ENEAGONO'
  | 'DECAGONO'
  | 'DELTOIDE'
  | 'ROMBOIDE'
  | 'ELIPSE'
  | 'TRAPECIO_ISOSCELES'
  | 'TRAPEZOIDE';

export interface Figura {
  id: TipoFigura;
  nombre: string;
  campos: CampoFigura[];
}

export interface CampoFigura {
  id: string;
  label: string;
  placeholder: string;
}

export const FIGURAS: Figura[] = [
  {
    id: 'RECTANGULO',
    nombre: 'Rectángulo',
    campos: [
      { id: 'ancho', label: 'Ancho (cm)', placeholder: '100' },
      { id: 'alto', label: 'Alto (cm)', placeholder: '150' },
    ],
  },
  {
    id: 'CUADRADO',
    nombre: 'Cuadrado',
    campos: [
      { id: 'lado', label: 'Lado (cm)', placeholder: '100' },
    ],
  },
  {
    id: 'CIRCULO',
    nombre: 'Círculo',
    campos: [
      { id: 'radio', label: 'Radio (cm)', placeholder: '50' },
    ],
  },
  {
    id: 'TRIANGULO',
    nombre: 'Triángulo',
    campos: [
      { id: 'base', label: 'Base (cm)', placeholder: '100' },
      { id: 'altura', label: 'Altura (cm)', placeholder: '80' },
    ],
  },
  {
    id: 'OVALO',
    nombre: 'Óvalo',
    campos: [
      { id: 'ancho', label: 'Ancho (cm)', placeholder: '120' },
      { id: 'alto', label: 'Alto (cm)', placeholder: '80' },
    ],
  },
  {
    id: 'TRAPECIO',
    nombre: 'Trapecio',
    campos: [
      { id: 'baseMayor', label: 'Base Mayor (cm)', placeholder: '120' },
      { id: 'baseMenor', label: 'Base Menor (cm)', placeholder: '80' },
      { id: 'altura', label: 'Altura (cm)', placeholder: '70' },
    ],
  },
  {
    id: 'ROMBO',
    nombre: 'Rombo',
    campos: [
      { id: 'diagonal1', label: 'Diagonal Mayor (cm)', placeholder: '120' },
      { id: 'diagonal2', label: 'Diagonal Menor (cm)', placeholder: '80' },
    ],
  },
  {
    id: 'PENTAGONO',
    nombre: 'Pentágono Regular',
    campos: [
      { id: 'lado', label: 'Lado (cm)', placeholder: '80' },
    ],
  },
  {
    id: 'HEXAGONO',
    nombre: 'Hexágono Regular',
    campos: [
      { id: 'lado', label: 'Lado (cm)', placeholder: '80' },
    ],
  },
  {
    id: 'HEPTAGONO',
    nombre: 'Heptágono Regular',
    campos: [
      { id: 'lado', label: 'Lado (cm)', placeholder: '80' },
    ],
  },
  {
    id: 'OCTAGONO',
    nombre: 'Octágono Regular',
    campos: [
      { id: 'lado', label: 'Lado (cm)', placeholder: '80' },
    ],
  },
  {
    id: 'ENEAGONO',
    nombre: 'Eneágono Regular',
    campos: [
      { id: 'lado', label: 'Lado (cm)', placeholder: '80' },
    ],
  },
  {
    id: 'DECAGONO',
    nombre: 'Decágono Regular',
    campos: [
      { id: 'lado', label: 'Lado (cm)', placeholder: '80' },
    ],
  },
  {
    id: 'DELTOIDE',
    nombre: 'Deltoide',
    campos: [
      { id: 'diagonal1', label: 'Diagonal Mayor (cm)', placeholder: '120' },
      { id: 'diagonal2', label: 'Diagonal Menor (cm)', placeholder: '60' },
    ],
  },
  {
    id: 'ROMBOIDE',
    nombre: 'Romboide',
    campos: [
      { id: 'base', label: 'Base (cm)', placeholder: '100' },
      { id: 'altura', label: 'Altura (cm)', placeholder: '70' },
    ],
  },
  {
    id: 'ELIPSE',
    nombre: 'Elipse',
    campos: [
      { id: 'semiMayorA', label: 'Semieje Mayor (cm)', placeholder: '80' },
      { id: 'semiMenorB', label: 'Semieje Menor (cm)', placeholder: '50' },
    ],
  },
  {
    id: 'TRAPECIO_ISOSCELES',
    nombre: 'Trapecio Isósceles',
    campos: [
      { id: 'baseMayor', label: 'Base Mayor (cm)', placeholder: '120' },
      { id: 'baseMenor', label: 'Base Menor (cm)', placeholder: '80' },
      { id: 'altura', label: 'Altura (cm)', placeholder: '70' },
    ],
  },
  {
    id: 'TRAPEZOIDE',
    nombre: 'Trapezoide',
    campos: [
      { id: 'lado1', label: 'Lado 1 (cm)', placeholder: '100' },
      { id: 'lado2', label: 'Lado 2 (cm)', placeholder: '120' },
      { id: 'lado3', label: 'Lado 3 (cm)', placeholder: '80' },
      { id: 'lado4', label: 'Lado 4 (cm)', placeholder: '110' },
      { id: 'altura', label: 'Altura promedio (cm)', placeholder: '70' },
    ],
  },
];

export const calcularArea = (figura: TipoFigura, campos: Record<string, number>): number => {
  const cm2ToM2 = (cm2: number) => cm2 / 10000;

  switch (figura) {
    case 'RECTANGULO':
      return cm2ToM2((campos.ancho || 0) * (campos.alto || 0));
    case 'CUADRADO':
      return cm2ToM2(Math.pow(campos.lado || 0, 2));
    case 'CIRCULO':
      return cm2ToM2(Math.PI * Math.pow(campos.radio || 0, 2));
    case 'TRIANGULO':
      return cm2ToM2(((campos.base || 0) * (campos.altura || 0)) / 2);
    case 'OVALO':
    case 'ELIPSE':
      return cm2ToM2(Math.PI * (campos.ancho || campos.semiMayorA || 0) / 2 * (campos.alto || campos.semiMenorB || 0) / 2);
    case 'TRAPECIO':
    case 'TRAPECIO_ISOSCELES':
      return cm2ToM2(((campos.baseMayor || 0) + (campos.baseMenor || 0)) / 2 * (campos.altura || 0));
    case 'ROMBO':
    case 'DELTOIDE':
      return cm2ToM2(((campos.diagonal1 || 0) * (campos.diagonal2 || 0)) / 2);
    case 'PENTAGONO':
      return cm2ToM2((Math.pow(campos.lado || 0, 2) * Math.sqrt(25 + 10 * Math.sqrt(5))) / 4);
    case 'HEXAGONO':
      return cm2ToM2((3 * Math.sqrt(3) * Math.pow(campos.lado || 0, 2)) / 2);
    case 'HEPTAGONO':
      return cm2ToM2((7 * Math.pow(campos.lado || 0, 2) * Math.cos(Math.PI / 7)) / (4 * Math.sin(Math.PI / 7)));
    case 'OCTAGONO':
      return cm2ToM2(2 * Math.pow(campos.lado || 0, 2) * (1 + Math.sqrt(2)));
    case 'ENEAGONO':
      return cm2ToM2((9 * Math.pow(campos.lado || 0, 2)) / (4 * Math.tan(Math.PI / 9)));
    case 'DECAGONO':
      return cm2ToM2((5 * Math.pow(campos.lado || 0, 2) * Math.sqrt(5 + 2 * Math.sqrt(5))) / 2);
    case 'ROMBOIDE':
      return cm2ToM2((campos.base || 0) * (campos.altura || 0));
    case 'TRAPEZOIDE':
      return cm2ToM2(((campos.lado1 || 0) + (campos.lado2 || 0) + (campos.lado3 || 0) + (campos.lado4 || 0)) / 4 * (campos.altura || 0));
    default:
      return 0;
  }
};

export const getFiguraById = (id: TipoFigura): Figura | undefined => {
  return FIGURAS.find(f => f.id === id);
};
