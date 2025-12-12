/*
  # Crear tabla de cotizaciones

  1. New Tables
    - `cotizaciones`
      - `id` (uuid, primary key)
      - `id_cotizacion` (integer, unique)
      - `fecha` (date)
      - `cliente` (text)
      - `producto` (text)
      - `subtotal` (numeric)
      - `iva` (numeric)
      - `total` (numeric)
      - `usuario` (text)
      - `id_usuario` (integer)
      - `observaciones` (text)
      - `aplicar_iva` (boolean)
      - `tipo_precio` (text)
      - `precio_unitario` (numeric)
      - `piezas` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `cotizaciones` table
    - Add policy for users to read their own cotizaciones
    - Add policy for users to insert their own cotizaciones
*/

CREATE TABLE IF NOT EXISTS cotizaciones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_cotizacion INTEGER UNIQUE NOT NULL,
  fecha DATE NOT NULL,
  cliente TEXT NOT NULL,
  producto TEXT NOT NULL,
  subtotal NUMERIC NOT NULL,
  iva NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  usuario TEXT NOT NULL,
  id_usuario INTEGER NOT NULL,
  observaciones TEXT,
  aplicar_iva BOOLEAN DEFAULT true,
  tipo_precio TEXT NOT NULL,
  precio_unitario NUMERIC NOT NULL,
  piezas JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE cotizaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own cotizaciones"
  ON cotizaciones
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = usuario);

CREATE POLICY "Users can insert their own cotizaciones"
  ON cotizaciones
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = usuario);

CREATE INDEX idx_cotizaciones_usuario ON cotizaciones(usuario);
CREATE INDEX idx_cotizaciones_id_usuario ON cotizaciones(id_usuario);
CREATE INDEX idx_cotizaciones_fecha ON cotizaciones(fecha);
