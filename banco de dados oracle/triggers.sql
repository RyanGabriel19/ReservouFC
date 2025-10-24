use dbReservouFC;
SHOW TRIGGERS;

DELIMITER $$

/* =========================
   TRIGGERS PARA USUARIO
   ========================= */

DROP TRIGGER IF EXISTS trg_usuario_after_insert$$
CREATE TRIGGER trg_usuario_after_insert
AFTER INSERT ON USUARIO
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'INSERT',
    'usuario_criado',
    NULL,
    JSON_OBJECT(
      'id', NEW.id,
      'nome', NEW.nome,
      'telefone', NEW.telefone,
      'email', NEW.email,
      'tipo', NEW.tipo,
      'criado_em', DATE_FORMAT(NEW.criado_em, '%Y-%m-%d %H:%i:%s')
    )
  );
END$$

DROP TRIGGER IF EXISTS trg_usuario_after_update$$
CREATE TRIGGER trg_usuario_after_update
AFTER UPDATE ON USUARIO
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'UPDATE',
    'usuario_atualizado',
    JSON_OBJECT(
      'id', OLD.id,
      'nome', OLD.nome,
      'telefone', OLD.telefone,
      'email', OLD.email,
      'tipo', OLD.tipo,
      'criado_em', DATE_FORMAT(OLD.criado_em, '%Y-%m-%d %H:%i:%s'),
      'atualizado_em', IFNULL(DATE_FORMAT(OLD.atualizado_em, '%Y-%m-%d %H:%i:%s'), NULL)
    ),
    JSON_OBJECT(
      'id', NEW.id,
      'nome', NEW.nome,
      'telefone', NEW.telefone,
      'email', NEW.email,
      'tipo', NEW.tipo,
      'criado_em', DATE_FORMAT(NEW.criado_em, '%Y-%m-%d %H:%i:%s'),
      'atualizado_em', IFNULL(DATE_FORMAT(NEW.atualizado_em, '%Y-%m-%d %H:%i:%s'), NULL)
    )
  );
END$$

DROP TRIGGER IF EXISTS trg_usuario_after_delete$$
CREATE TRIGGER trg_usuario_after_delete
AFTER DELETE ON USUARIO
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'DELETE',
    'usuario_excluido',
    JSON_OBJECT(
      'id', OLD.id,
      'nome', OLD.nome,
      'telefone', OLD.telefone,
      'email', OLD.email,
      'tipo', OLD.tipo,
      'criado_em', DATE_FORMAT(OLD.criado_em, '%Y-%m-%d %H:%i:%s'),
      'atualizado_em', IFNULL(DATE_FORMAT(OLD.atualizado_em, '%Y-%m-%d %H:%i:%s'), NULL)
    ),
    NULL
  );
END$$

/* =========================
   TRIGGERS PARA QUADRA
   ========================= */

DROP TRIGGER IF EXISTS trg_quadra_after_insert$$
CREATE TRIGGER trg_quadra_after_insert
AFTER INSERT ON QUADRA
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'INSERT',
    'quadra_criada',
    NULL,
    JSON_OBJECT(
      'id', NEW.id,
      'nome', NEW.nome,
      'localizacao', NEW.localizacao,
      'valor_hora', NEW.valor_hora,
      'ativo', NEW.ativo,
      'criado_em', DATE_FORMAT(NEW.criado_em, '%Y-%m-%d %H:%i:%s')
    )
  );
END$$

DROP TRIGGER IF EXISTS trg_quadra_after_update$$
CREATE TRIGGER trg_quadra_after_update
AFTER UPDATE ON QUADRA
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'UPDATE',
    'quadra_atualizada',
    JSON_OBJECT(
      'id', OLD.id,
      'nome', OLD.nome,
      'localizacao', OLD.localizacao,
      'valor_hora', OLD.valor_hora,
      'ativo', OLD.ativo,
      'criado_em', DATE_FORMAT(OLD.criado_em, '%Y-%m-%d %H:%i:%s'),
      'atualizado_em', IFNULL(DATE_FORMAT(OLD.atualizado_em, '%Y-%m-%d %H:%i:%s'), NULL)
    ),
    JSON_OBJECT(
      'id', NEW.id,
      'nome', NEW.nome,
      'localizacao', NEW.localizacao,
      'valor_hora', NEW.valor_hora,
      'ativo', NEW.ativo,
      'criado_em', DATE_FORMAT(NEW.criado_em, '%Y-%m-%d %H:%i:%s'),
      'atualizado_em', IFNULL(DATE_FORMAT(NEW.atualizado_em, '%Y-%m-%d %H:%i:%s'), NULL)
    )
  );
END$$

DROP TRIGGER IF EXISTS trg_quadra_after_delete$$
CREATE TRIGGER trg_quadra_after_delete
AFTER DELETE ON QUADRA
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'DELETE',
    'quadra_excluida',
    JSON_OBJECT(
      'id', OLD.id,
      'nome', OLD.nome,
      'localizacao', OLD.localizacao,
      'valor_hora', OLD.valor_hora,
      'ativo', OLD.ativo,
      'criado_em', DATE_FORMAT(OLD.criado_em, '%Y-%m-%d %H:%i:%s'),
      'atualizado_em', IFNULL(DATE_FORMAT(OLD.atualizado_em, '%Y-%m-%d %H:%i:%s'), NULL)
    ),
    NULL
  );
END$$

/* =========================
   TRIGGERS PARA RESERVA
   ========================= */

DROP TRIGGER IF EXISTS trg_reserva_after_insert$$
CREATE TRIGGER trg_reserva_after_insert
AFTER INSERT ON RESERVA
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'INSERT',
    'reserva_criada',
    NULL,
    JSON_OBJECT(
      'id', NEW.id,
      'quadra_id', NEW.quadra_id,
      'usuario_id', NEW.usuario_id,
      'data_hora', DATE_FORMAT(NEW.data_hora, '%Y-%m-%d %H:%i:%s'),
      'duracao_min', NEW.duracao_min,
      'valor', NEW.valor,
      'status', NEW.status
    )
  );
END$$

DROP TRIGGER IF EXISTS trg_reserva_after_update$$
CREATE TRIGGER trg_reserva_after_update
AFTER UPDATE ON RESERVA
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'UPDATE',
    'reserva_atualizada',
    JSON_OBJECT(
      'id', OLD.id,
      'quadra_id', OLD.quadra_id,
      'usuario_id', OLD.usuario_id,
      'data_hora', DATE_FORMAT(OLD.data_hora, '%Y-%m-%d %H:%i:%s'),
      'duracao_min', OLD.duracao_min,
      'valor', OLD.valor,
      'status', OLD.status
    ),
    JSON_OBJECT(
      'id', NEW.id,
      'quadra_id', NEW.quadra_id,
      'usuario_id', NEW.usuario_id,
      'data_hora', DATE_FORMAT(NEW.data_hora, '%Y-%m-%d %H:%i:%s'),
      'duracao_min', NEW.duracao_min,
      'valor', NEW.valor,
      'status', NEW.status
    )
  );
END$$

DROP TRIGGER IF EXISTS trg_reserva_after_delete$$
CREATE TRIGGER trg_reserva_after_delete
AFTER DELETE ON RESERVA
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'DELETE',
    'reserva_excluida',
    JSON_OBJECT(
      'id', OLD.id,
      'quadra_id', OLD.quadra_id,
      'usuario_id', OLD.usuario_id,
      'data_hora', DATE_FORMAT(OLD.data_hora, '%Y-%m-%d %H:%i:%s'),
      'duracao_min', OLD.duracao_min,
      'valor', OLD.valor,
      'status', OLD.status
    ),
    NULL
  );
END$$

/* =========================
   TRIGGERS PARA DISPONIBILIDADE_SEMANA
   ========================= */

DROP TRIGGER IF EXISTS trg_dispsem_after_insert$$
CREATE TRIGGER trg_dispsem_after_insert
AFTER INSERT ON DISPONIBILIDADE_SEMANA
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'INSERT',
    'disponibilidade_semana_criada',
    NULL,
    JSON_OBJECT(
      'id', NEW.id,
      'quadra_id', NEW.quadra_id,
      'dia_semana', NEW.dia_semana,
      'hora_inicio', DATE_FORMAT(NEW.hora_inicio, '%H:%i:%s'),
      'hora_fim', DATE_FORMAT(NEW.hora_fim, '%H:%i:%s'),
      'duracao_min', NEW.duracao_min,
      'ativo', NEW.ativo
    )
  );
END$$

DROP TRIGGER IF EXISTS trg_dispsem_after_update$$
CREATE TRIGGER trg_dispsem_after_update
AFTER UPDATE ON DISPONIBILIDADE_SEMANA
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'UPDATE',
    'disponibilidade_semana_atualizada',
    JSON_OBJECT(
      'id', OLD.id,
      'quadra_id', OLD.quadra_id,
      'dia_semana', OLD.dia_semana,
      'hora_inicio', DATE_FORMAT(OLD.hora_inicio, '%H:%i:%s'),
      'hora_fim', DATE_FORMAT(OLD.hora_fim, '%H:%i:%s'),
      'duracao_min', OLD.duracao_min,
      'ativo', OLD.ativo
    ),
    JSON_OBJECT(
      'id', NEW.id,
      'quadra_id', NEW.quadra_id,
      'dia_semana', NEW.dia_semana,
      'hora_inicio', DATE_FORMAT(NEW.hora_inicio, '%H:%i:%s'),
      'hora_fim', DATE_FORMAT(NEW.hora_fim, '%H:%i:%s'),
      'duracao_min', NEW.duracao_min,
      'ativo', NEW.ativo
    )
  );
END$$

DROP TRIGGER IF EXISTS trg_dispsem_after_delete$$
CREATE TRIGGER trg_dispsem_after_delete
AFTER DELETE ON DISPONIBILIDADE_SEMANA
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'DELETE',
    'disponibilidade_semana_excluida',
    JSON_OBJECT(
      'id', OLD.id,
      'quadra_id', OLD.quadra_id,
      'dia_semana', OLD.dia_semana,
      'hora_inicio', DATE_FORMAT(OLD.hora_inicio, '%H:%i:%s'),
      'hora_fim', DATE_FORMAT(OLD.hora_fim, '%H:%i:%s'),
      'duracao_min', OLD.duracao_min,
      'ativo', OLD.ativo
    ),
    NULL
  );
END$$

/* =========================
   TRIGGERS PARA HORARIO_BLOQUEADO
   ========================= */

DROP TRIGGER IF EXISTS trg_horariobloq_after_insert$$
CREATE TRIGGER trg_horariobloq_after_insert
AFTER INSERT ON HORARIO_BLOQUEADO
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'INSERT',
    'horario_bloqueado_criado',
    NULL,
    JSON_OBJECT(
      'id', NEW.id,
      'quadra_id', NEW.quadra_id,
      'horario', DATE_FORMAT(NEW.horario, '%Y-%m-%d %H:%i:%s'),
      'motivo', NEW.motivo,
      'criado_por', NEW.criado_por
    )
  );
END$$

DROP TRIGGER IF EXISTS trg_horariobloq_after_delete$$
CREATE TRIGGER trg_horariobloq_after_delete
AFTER DELETE ON HORARIO_BLOQUEADO
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'DELETE',
    'horario_bloqueado_removido',
    JSON_OBJECT(
      'id', OLD.id,
      'quadra_id', OLD.quadra_id,
      'horario', DATE_FORMAT(OLD.horario, '%Y-%m-%d %H:%i:%s'),
      'motivo', OLD.motivo,
      'criado_por', OLD.criado_por
    ),
    NULL
  );
END$$


/* =========================
   TRIGGERS PARA DIA_FECHADO
   ========================= */

DROP TRIGGER IF EXISTS trg_diafechado_after_insert$$
CREATE TRIGGER trg_diafechado_after_insert
AFTER INSERT ON DIA_FECHADO
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'INSERT',
    'dia_fechado_criado',
    NULL,
    JSON_OBJECT(
      'id', NEW.id,
      'quadra_id', NEW.quadra_id,
      'data_fechada', DATE_FORMAT(NEW.data_fechada, '%Y-%m-%d'),
      'motivo', NEW.motivo
    )
  );
END$$

DROP TRIGGER IF EXISTS trg_diafechado_after_delete$$
CREATE TRIGGER trg_diafechado_after_delete
AFTER DELETE ON DIA_FECHADO
FOR EACH ROW
BEGIN
  CALL prc_insert_log(
    'DELETE',
    'dia_fechado_removido',
    JSON_OBJECT(
      'id', OLD.id,
      'quadra_id', OLD.quadra_id,
      'data_fechada', DATE_FORMAT(OLD.data_fechada, '%Y-%m-%d'),
      'motivo', OLD.motivo
    ),
    NULL
  );
END$$

DELIMITER ;