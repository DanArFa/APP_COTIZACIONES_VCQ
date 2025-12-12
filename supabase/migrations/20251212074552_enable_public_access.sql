/*
  # Habilitar acceso público a las tablas

  1. Políticas de acceso
    - Permitir lectura y escritura pública a todas las tablas para la aplicación
    - Las tablas ya tienen RLS habilitado, agregamos políticas permisivas
  
  2. Tablas afectadas
    - Usuarios: lectura para login y gestión
    - Precios: lectura para cotizador
    - Procesos: lectura para cotizador
    - Clientes: lectura y escritura para gestión
    - Registro Cotizacion: lectura y escritura
    - Cotizaciones: lectura y escritura
*/

CREATE POLICY "Allow public read access to Usuarios"
  ON "Usuarios"
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to Usuarios"
  ON "Usuarios"
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to Usuarios"
  ON "Usuarios"
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to Precios"
  ON "Precios"
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public update to Precios"
  ON "Precios"
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to Procesos"
  ON "Procesos"
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public update to Procesos"
  ON "Procesos"
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to Clientes"
  ON "Clientes"
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to Clientes"
  ON "Clientes"
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to Clientes"
  ON "Clientes"
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from Clientes"
  ON "Clientes"
  FOR DELETE
  USING (true);

CREATE POLICY "Allow public read access to Registro Cotizacion"
  ON "Registro Cotizacion"
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to Registro Cotizacion"
  ON "Registro Cotizacion"
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read access to Cotizaciones"
  ON "Cotizaciones"
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to Cotizaciones"
  ON "Cotizaciones"
  FOR INSERT
  WITH CHECK (true);
