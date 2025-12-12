/*
  # Add RFC column to Clientes table

  1. Changes
    - Add RFC column to Clientes table to store tax ID information
  
  2. Notes
    - Column is nullable to allow existing records and optional data entry
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Clientes' AND column_name = 'RFC'
  ) THEN
    ALTER TABLE "Clientes" ADD COLUMN "RFC" text;
  END IF;
END $$;
