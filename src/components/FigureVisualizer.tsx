import { useEffect, useRef } from 'react';

interface CampoMedida {
  nombre: string;
  valor: number;
  unidad?: string;
}

interface FigureVisualizerProps {
  tipoFigura: string;
  campos: CampoMedida[];
  scale?: number;
}

export default function FigureVisualizer({ tipoFigura, campos, scale = 2 }: FigureVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCampoValor = (nombre: string): number => {
    const campo = campos.find(c => c.nombre.toLowerCase() === nombre.toLowerCase());
    return campo ? campo.valor : 100;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    const drawRectangle = () => {
      const width = getCampoValor('ancho') * scale;
      const height = getCampoValor('alto') * scale;

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.strokeRect(-width / 2, -height / 2, width, height);

      ctx.fillStyle = '#06b6d4';
      ctx.globalAlpha = 0.1;
      ctx.fillRect(-width / 2, -height / 2, width, height);
      ctx.globalAlpha = 1;

      drawMeasurements(width, height);
    };

    const drawSquare = () => {
      const size = getCampoValor('lado') * scale;

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.strokeRect(-size / 2, -size / 2, size, size);

      ctx.fillStyle = '#06b6d4';
      ctx.globalAlpha = 0.1;
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.globalAlpha = 1;

      drawMeasurements(size, size);
    };

    const drawTriangle = () => {
      const width = getCampoValor('ancho') * scale;
      const height = getCampoValor('altura') * scale;

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -height / 2);
      ctx.lineTo(width / 2, height / 2);
      ctx.lineTo(-width / 2, height / 2);
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = '#06b6d4';
      ctx.globalAlpha = 0.1;
      ctx.fill();
      ctx.globalAlpha = 1;

      drawTriangleMeasurements(width, height);
    };

    const drawCircle = () => {
      const radius = getCampoValor('diametro') * scale / 2;

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#06b6d4';
      ctx.globalAlpha = 0.1;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(-radius, 0);
      ctx.lineTo(radius, 0);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${getCampoValor('diametro')} cm`, 0, -radius - 10);
    };

    const drawHexagon = () => {
      const radius = getCampoValor('lado') * scale;
      const points = [];

      for (let i = 0; i < 6; i++) {
        const angle = (i * 60) * (Math.PI / 180);
        points.push({
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle),
        });
      }

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = '#06b6d4';
      ctx.globalAlpha = 0.1;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${getCampoValor('lado')} cm`, 0, 0);
    };

    const drawMeasurements = (width: number, height: number) => {
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;

      const padding = 40;

      ctx.beginPath();
      ctx.moveTo(-width / 2, height / 2 + padding / 2);
      ctx.lineTo(width / 2, height / 2 + padding / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-width / 2 - padding / 2, -height / 2);
      ctx.lineTo(-width / 2 - padding / 2, height / 2);
      ctx.stroke();

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(`${getCampoValor('ancho')} cm`, 0, height / 2 + padding / 2 + 5);

      ctx.save();
      ctx.translate(-width / 2 - padding / 2 - 15, 0);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText(`${getCampoValor('alto')} cm`, 0, 0);
      ctx.restore();
    };

    const drawTriangleMeasurements = (width: number, height: number) => {
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;

      const padding = 40;

      ctx.beginPath();
      ctx.moveTo(-width / 2 - padding / 2, height / 2);
      ctx.lineTo(width / 2 + padding / 2, height / 2);
      ctx.stroke();

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(`${getCampoValor('ancho')} cm`, 0, height / 2 + 15);

      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${getCampoValor('altura')} cm`, -width / 2 - 10, -height / 2 + 10);
    };

    switch (tipoFigura.toLowerCase()) {
      case 'rectangulo':
        drawRectangle();
        break;
      case 'cuadrado':
        drawSquare();
        break;
      case 'triangulo':
        drawTriangle();
        break;
      case 'circulo':
        drawCircle();
        break;
      case 'hexagono':
        drawHexagon();
        break;
      default:
        drawRectangle();
    }

    ctx.restore();
  }, [tipoFigura, campos, scale]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="border-2 border-slate-700 rounded-lg bg-white"
      />
      <div className="text-xs text-slate-400">
        Visualización en tiempo real
      </div>
    </div>
  );
}
