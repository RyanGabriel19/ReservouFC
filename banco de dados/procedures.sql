DELIMITER $$

DROP PROCEDURE IF EXISTS prc_insert_log$$

CREATE PROCEDURE prc_insert_log(
  IN p_tipo_evento   VARCHAR(80),
  IN p_detalhes      TEXT,
  IN p_valores_old   JSON,
  IN p_valores_new   JSON
)
BEGIN
  DECLARE v_id_usuario INT DEFAULT NULL;

  -- Determina o usuário: usa variável de sessão @current_user_id, se existir
  SET v_id_usuario = NULLIF(@current_user_id, 0);

  -- Inserção final no log
  INSERT INTO LOG (
    tipo_evento,
    id_usuario,
    detalhes,
    valores_old,
    valores_new
  ) VALUES (
    p_tipo_evento,
    v_id_usuario,
    p_detalhes,
    p_valores_old,
    p_valores_new
  );
END$$

DELIMITER ;