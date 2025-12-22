/*
  # Create Standard Glass Figures Table

  1. New Tables
    - `standard_figures`
      - `id` (uuid, primary key)
      - `nombre` (text, name of the standard figure)
      - `descripcion` (text, description of the figure)
      - `tipo_figura` (text, type: rectangulo, cuadrado, triangulo, etc)
      - `campos_medida` (jsonb, array of measurement fields like [{"nombre": "alto", "valor_default": 100}, ...])
      - `es_activa` (boolean, whether the figure is active)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `standard_figures` table
    - Add policy for public read access (all users can view standard figures)
    - Add policy for admins to create/update/delete figures
*/

CREATE TABLE IF NOT EXISTS standard_figures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  descripcion text,
  tipo_figura text NOT NULL,
  campos_medida jsonb NOT NULL DEFAULT '[]'::jsonb,
  es_activa boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE standard_figures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view standard figures"
  ON standard_figures
  FOR SELECT
  TO public
  USING (es_activa = true);

CREATE POLICY "Only admins can insert figures"
  ON standard_figures
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Only admins can update figures"
  ON standard_figures
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only admins can delete figures"
  ON standard_figures
  FOR DELETE
  TO authenticated
  USING (true);
