/*
  # Restore usuarios data

  Restore the original 5 users that were deleted
*/

INSERT INTO "Usuarios" ("ID_USUARIO", "USUARIO", "CONTRASENA", "NOMBRE", "ROL", "ACTIVO")
VALUES
  (1, 'carlos_fraile', '123calos3', 'Administrador', 'ADMIN', 'SI'),
  (2, 'dan_arellano', '123dan3', 'Administrador', 'ADMIN', 'SI'),
  (3, 'susy_bust', '123susy3', 'Vendedor', 'VENT', 'SI'),
  (4, 'susana_peña', '123susana3', 'Administrador', 'ADMIN', 'SI'),
  (5, 'vendedor', '123ventas3', 'Vendedor', 'VENT', 'SI');