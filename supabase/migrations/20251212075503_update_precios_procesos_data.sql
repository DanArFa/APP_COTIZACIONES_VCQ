/*
  # Actualizar datos de Precios y Procesos

  1. Limpieza
    - Eliminar todos los registros actuales de Precios y Procesos
  
  2. Nuevos datos
    - Insertar 32 productos con precios actualizados
    - Insertar 24 procesos con precios actualizados
  
  3. Cambios importantes
    - Precios actualizados según Excel proporcionado
    - Procesos expandidos con nuevas opciones de templado
    - Precios ajustados y corregidos
*/

-- Limpiar datos existentes
DELETE FROM "Precios";
DELETE FROM "Procesos";

-- Insertar precios actualizados
INSERT INTO "Precios" ("Producto", "PRECIO_INSTALADOR", "PRECIO_PUBLICO", "PRECIO_CORTE") VALUES
('ANTIREFLEJANTE 2MM', '740.00', '910.00', '1525.89'),
('CLARO 2MM', '335.00', '410.00', '638.70'),
('CLARO 3MM', '358.00', '440.00', '674.80'),
('CLARO 4MM', '400.00', '490.00', '710.70'),
('CLARO 5MM', '315.00', '400.00', '729.00'),
('CLARO 6MM', '368.00', '450.00', '796.23'),
('CLARO 8MM', '779.00', '960.00', '1610.20'),
('CLARO 9 (10) MM', '950.00', '1150.00', '2301.80'),
('CLARO 12MM', '1100.00', '1560.00', '2597.03'),
('FILTRASOL 3MM', '304.26', '426.00', '990.00'),
('FILTRASOL 6MM', '340.26', '486.00', '953.57'),
('FILTRASOL 9 (10) MM', '1120.00', '1450.00', '2331.63'),
('BRONCE 6MM', '1150.00', '1430.00', '3572.80'),
('BRONCE 9MM', '1550.00', '1930.00', '4036.72'),
('CRISTAZUL 3MM', '630.00', '952.00', '2734.20'),
('CRISTAZUL 9MM', '5240.00', '6520.00', '10464.40'),
('TINTEX 6MM', '1840.00', '2280.00', '3395.04'),
('TINTEX 9MM', '3840.00', '4530.00', '9118.23'),
('TX PLUS 6MM', '1645.00', '1970.00', '3279.20'),
('LUNA 2MM', '388.00', '457.00', '829.36'),
('LUNA 3MM', '469.00', '549.00', '957.89'),
('LUNA 4MM', '489.00', '579.00', '1148.40'),
('LUNA 6MM', '579.00', '772.00', '1293.11'),
('LUNA FILT 3MM', '449.00', '580.00', '1293.40'),
('LUNA VINTAGE 2MM', '449.00', '580.00', '1293.40'),
('REFLECTA PLATA', '1099.00', '1317.28', '2189.79'),
('INASTILLABLE CLARO', '1099.00', '1321.55', '2195.92'),
('INASTILLABLE TX BRONCE', '1505.00', '1806.26', '3403.76'),
('SATINADO 6MM', '1021.00', '1223.06', '2031.76'),
('SATINADO 9MM', '1535.00', '1865.92', '6068.78'),
('REFLECTA AZUL/ROYAL BLUE', '1100.00', '2213.20', '3682.00'),
('ESLABON 3.5MM', '500.00', '595.00', '1000.00');

-- Insertar procesos actualizados
INSERT INTO "Procesos" ("Proceso", "Precio") VALUES
('CANTO PULIDO 6MM', '70.00'),
('CANTO PULIDO 10MM', '90.00'),
('TEMPLADO 6MM', '900.00'),
('TEMPLADO 8MM', '1600.00'),
('TEMPLADO 10MM', '1260.00'),
('TEMPLADO 12MM', '1610.00'),
('TEMP. FILT 5.9MM', '1340.00'),
('TEMP. FILT 6MM', '1245.00'),
('TEMP. TX 6MM', '2310.00'),
('TEMP. TX 10MM', '1100.00'),
('TEMP. REPLA 6MM', '1910.00'),
('TEMP CRISTAZUL 6MM', '2100.00'),
('TEMP ROYAL BLUE', '2100.00'),
('MAQ. TEMPLADO 6MM', '135.00'),
('MAQ. TEMPLADO 9MM', '235.00'),
('MAQ. CANTO 6MM', '40.00'),
('MAQ. CANTO 10MM', '50.00'),
('SAQUES', '60.00'),
('SAQUES PISO/GRANDE', '110.00'),
('BISAGRA MICKEY', '75.00'),
('BARRENOS', '20.00'),
('FILO MUERTO 6MM', '30.00'),
('FILO MUERTO 9MM', '30.00'),
('ESMERILADO', '210.00');
