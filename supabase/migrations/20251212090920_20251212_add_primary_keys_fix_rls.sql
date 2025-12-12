/*
  # Fix Security Issues: Add Primary Keys, Remove Unused Indexes, Fix RLS

  1. New Primary Keys
    - Add UUID primary key to tables missing them: Procesos, Precios, Clientes, Cotizaciones, Cotizador, Usuarios, Registro Cotizacion
    
  2. Remove Unused Indexes
    - idx_cotizaciones_fecha
    - idx_cotizaciones_usuario
    
  3. Fix RLS
    - Add restrictive policies to Cotizador table (currently has RLS but no policies)
*/

-- Add primary key to Procesos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'Procesos' AND constraint_type = 'PRIMARY KEY'
  ) THEN
    ALTER TABLE "Procesos" ADD COLUMN id uuid PRIMARY KEY DEFAULT gen_random_uuid();
  END IF;
END $$;

-- Add primary key to Precios
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'Precios' AND constraint_type = 'PRIMARY KEY'
  ) THEN
    ALTER TABLE "Precios" ADD COLUMN id uuid PRIMARY KEY DEFAULT gen_random_uuid();
  END IF;
END $$;

-- Add primary key to Clientes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'Clientes' AND constraint_type = 'PRIMARY KEY'
  ) THEN
    ALTER TABLE "Clientes" ADD COLUMN id uuid PRIMARY KEY DEFAULT gen_random_uuid();
  END IF;
END $$;

-- Add primary key to Cotizaciones
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'Cotizaciones' AND constraint_type = 'PRIMARY KEY'
  ) THEN
    ALTER TABLE "Cotizaciones" ADD COLUMN id uuid PRIMARY KEY DEFAULT gen_random_uuid();
  END IF;
END $$;

-- Add primary key to Cotizador
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'Cotizador' AND constraint_type = 'PRIMARY KEY'
  ) THEN
    ALTER TABLE "Cotizador" ADD COLUMN id uuid PRIMARY KEY DEFAULT gen_random_uuid();
  END IF;
END $$;

-- Add primary key to Usuarios
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'Usuarios' AND constraint_type = 'PRIMARY KEY'
  ) THEN
    ALTER TABLE "Usuarios" ADD COLUMN id uuid PRIMARY KEY DEFAULT gen_random_uuid();
  END IF;
END $$;

-- Add primary key to Registro Cotizacion
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'Registro Cotizacion' AND constraint_type = 'PRIMARY KEY'
  ) THEN
    ALTER TABLE "Registro Cotizacion" ADD COLUMN id uuid PRIMARY KEY DEFAULT gen_random_uuid();
  END IF;
END $$;

-- Remove unused indexes
DROP INDEX IF EXISTS idx_cotizaciones_fecha;
DROP INDEX IF EXISTS idx_cotizaciones_usuario;

-- Add RLS policies to Cotizador (currently has RLS but no policies, locking it down)
-- First, verify RLS is enabled
DO $$
BEGIN
  ALTER TABLE "Cotizador" ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Create policy to deny all access by default (restrictive)
-- This prevents any data access until explicit policies are added
CREATE POLICY "Deny all access by default" ON "Cotizador"
  FOR ALL
  TO public
  USING (false)
  WITH CHECK (false);