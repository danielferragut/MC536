CREATE OR REPLACE FUNCTION get_paciente_text(p_column TEXT, p_value TEXT)
  RETURNS SETOF paciente LANGUAGE plpgsql AS
$func$
DECLARE
    query TEXT := 'SELECT * FROM paciente';
BEGIN
    IF p_column IS NOT NULL THEN
        query := query || ' WHERE ' || quote_ident(p_column) || ' = $1';
    END IF;
    RETURN QUERY EXECUTE query
    USING p_value;
END;
$func$;

CREATE OR REPLACE FUNCTION get_medico_text(p_column TEXT, p_value TEXT)
  RETURNS SETOF médico LANGUAGE plpgsql AS
$func$
DECLARE
    query TEXT := 'SELECT * FROM médico';
BEGIN
    IF p_column IS NOT NULL THEN
        query := query || ' WHERE ' || quote_ident(p_column) || ' = $1';
    END IF;
    RETURN QUERY EXECUTE query
    USING p_value;
END;
$func$;

