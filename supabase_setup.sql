-- Añadir nuevas columnas a la tabla de productos
ALTER TABLE productos
ADD COLUMN IF NOT EXISTS fecha_caducidad DATE,
ADD COLUMN IF NOT EXISTS ficha_seguridad_url TEXT;

-- Crear el bucket 'fichas_seguridad' para almacenar archivos
-- Nota: Esto puede requerir permisos de administrador en Supabase
-- Si no funciona, crea el bucket manualmente desde el panel de Storage con el nombre 'fichas_seguridad'

INSERT INTO storage.buckets (id, name, public)
SELECT 'fichas_seguridad', 'fichas_seguridad', true
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'fichas_seguridad'
);

-- Habilitar políticas de acceso público (Lectura) para el bucket
CREATE POLICY "Acceso Público Lectura Sds" ON storage.objects
FOR SELECT TO public USING (bucket_id = 'fichas_seguridad');

-- Habilitar políticas de inserción para usuarios autenticados (o anon si no hay auth)
CREATE POLICY "Acceso Anon Inserción Sds" ON storage.objects
FOR INSERT TO public WITH CHECK (bucket_id = 'fichas_seguridad');
