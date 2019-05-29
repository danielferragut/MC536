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
  RETURNS SETOF medico LANGUAGE plpgsql AS
$func$
DECLARE
    query TEXT := 'SELECT * FROM medico';
BEGIN
    IF p_column IS NOT NULL THEN
        query := query || ' WHERE ' || quote_ident(p_column) || ' = $1';
    END IF;
    RETURN QUERY EXECUTE query
    USING p_value;
END;
$func$;

CREATE OR REPLACE FUNCTION get_consulta_text(p_column TEXT, p_value TEXT)
  RETURNS SETOF consulta LANGUAGE plpgsql AS
$func$
DECLARE
    query TEXT := 'SELECT * FROM consulta';
BEGIN
    IF p_column IS NOT NULL THEN
        query := query || ' WHERE ' || quote_ident(p_column) || ' = $1';
    END IF;
    RETURN QUERY EXECUTE query
    USING p_value;
END;
$func$;

CREATE OR REPLACE FUNCTION get_cirugia_text(p_column TEXT, p_value TEXT)
  RETURNS SETOF consulta LANGUAGE plpgsql AS
$func$
DECLARE
    query TEXT := 'SELECT * FROM consulta';
BEGIN
    IF p_column IS NOT NULL THEN
        query := query || ' WHERE ' || quote_ident(p_column) || ' = $1';
    END IF;
    RETURN QUERY EXECUTE query
    USING p_value;
END;
$func$;

CREATE OR REPLACE FUNCTION get_atendimento_text(p_column TEXT, p_value TEXT)
  RETURNS SETOF atendimento LANGUAGE plpgsql AS
$func$
DECLARE
    query TEXT := 'SELECT * FROM atendimento';
BEGIN
    IF p_column IS NOT NULL THEN
        query := query || ' WHERE ' || quote_ident(p_column) || ' = $1';
    END IF;
    RETURN QUERY EXECUTE query
    USING p_value;
END;
$func$;

CREATE OR REPLACE FUNCTION get_internacao_text(p_column TEXT, p_value TEXT)
  RETURNS SETOF internacao LANGUAGE plpgsql AS
$func$
DECLARE
    query TEXT := 'SELECT * FROM internacao';
BEGIN
    IF p_column IS NOT NULL THEN
        query := query || ' WHERE ' || quote_ident(p_column) || ' = $1';
    END IF;
    RETURN QUERY EXECUTE query
    USING p_value;
END;
$func$;

