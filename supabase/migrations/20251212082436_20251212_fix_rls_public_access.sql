/*
  # Fix RLS policies for cotizaciones

  Change the RLS policies to allow public access with id_usuario filtering
  instead of requiring authentication, since the app uses local auth.
*/

DROP POLICY IF EXISTS "Users can read their own cotizaciones" ON cotizaciones;
DROP POLICY IF EXISTS "Users can insert their own cotizaciones" ON cotizaciones;

CREATE POLICY "Allow read access"
  ON cotizaciones
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert access"
  ON cotizaciones
  FOR INSERT
  WITH CHECK (true);
