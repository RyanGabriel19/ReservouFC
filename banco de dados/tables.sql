-- Garante que a conexão o Workbench, CLI, aplicação e o banco use utf8mb4, que é o conjunto de caracteres mais completo (suporta todos os emojis, acentos, etc)
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';

-- Pra que serve o ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci:
/*
ENGINE=InnoDB → escolhe o mecanismo de armazenamento.

InnoDB é o mais usado (suporta transações, chaves estrangeiras, locks de linha).

O MySQL também tem MyISAM, mas é obsoleto (não suporta FK, menos seguro).

DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci → garante que a tabela armazene texto em utf8mb4.

COLLATE define como o banco compara strings (ci = case insensitive, ou seja, “João” = “joão”).
*/
-- 1) Tabela USUARIO (clientes e admins)
CREATE TABLE USUARIO (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(13) NOT NULL, -- número corrido e com o 55 no começo, por exemplo: 5581988888888
    email VARCHAR(150) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo enum('a', 'c') NOT NULL DEFAULT 'c',
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_usuario_telefone (telefone),
    UNIQUE KEY uk_usuario_email (email)
) engine=innodb default charset=UTF8MB4 collate=UTF8MB4_UNICODE_CI;

-- 2) tabela quadra
CREATE TABLE QUADRA (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    localizacao varchar(255) NOT NULL,
    valor_hora DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    ativo enum('s', 'n') NOT NULL DEFAULT 's',
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) engine=innodb default charset=UTF8MB4 collate=UTF8MB4_UNICODE_CI;

-- 3) tabela reserva
-- unique (QUADRA_ID, DATA_HORA) EVITA OVERBOOKING PARA O MESMO HORÁRIO E QUADRA
CREATE TABLE RESERVA (
	id INT AUTO_INCREMENT PRIMARY KEY,
    quadra_id INT NOT NULL,
    usuario_id INT NOT NULL,
    data_hora DATETIME NOT NULL,
    duracao_min INT NOT NULL DEFAULT 60,
    valor DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status ENUM('PENDENTE', 'CONFIRMADO', 'CANCELADO') NOT NULL DEFAULT 'PENDENTE',
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_reserva_quadra FOREIGN KEY (quadra_id) REFERENCES QUADRA(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_reserva_usuario FOREIGN KEY (usuario_id) REFERENCES USUARIO(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    UNIQUE KEY UK_RESERVA_DATAHORA (QUADRA_ID, DATA_HORA)
) engine=innodb default charset=UTF8MB4 collate=UTF8MB4_UNICODE_CI;

-- 4) Tabela LOG (registro de ações)
CREATE TABLE LOG (
  id INT AUTO_INCREMENT PRIMARY KEY,
  datetime_log TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  tipo_evento VARCHAR(80) NOT NULL,    -- INSERT, UPDATE OU DELETE
  id_usuario INT NULL,                 -- quem fez a ação (admin ou cliente)
  detalhes TEXT NOT NULL, -- ex: 'reserva_criada','reserva_cancelada','bloqueio_criado'
  valores_old JSON,
  valores_new JSON,
  CONSTRAINT fk_log_usuario FOREIGN KEY (id_usuario) REFERENCES USUARIO(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 5) Tabela DISPONIBILIDADE_SEMANA (regras padrão por dia da semana)
CREATE TABLE DISPONIBILIDADE_SEMANA (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quadra_id INT NOT NULL,
  dia_semana TINYINT NOT NULL,    -- 1=domingo ... 7=sábado
  hora_inicio TIME NOT NULL,      -- ex: '08:00:00'
  hora_fim TIME NOT NULL,         -- ex: '22:00:00'
  duracao_min INT NOT NULL DEFAULT 60,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT fk_disponibilidade_quadra FOREIGN KEY (quadra_id) REFERENCES QUADRA(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 6) Tabela DIA_FECHADO (fecha todo o dia)
CREATE TABLE DIA_FECHADO (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quadra_id INT NOT NULL,
  data_fechada DATE NOT NULL,
  motivo VARCHAR(255) NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_diafechado_quadra FOREIGN KEY (quadra_id) REFERENCES QUADRA(id) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY uk_diafechado_quadra_data (quadra_id,data_fechada)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 7) Tabela HORARIO_BLOQUEADO (bloqueios pontuais: data+hora)
CREATE TABLE HORARIO_BLOQUEADO (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quadra_id INT NOT NULL,
  horario DATETIME NOT NULL,    -- ex: '2025-09-15 18:00:00'
  motivo VARCHAR(255) NULL,
  criado_por INT NULL,         -- id do admin criador
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_horariobloq_quadra FOREIGN KEY (quadra_id) REFERENCES QUADRA(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_horariobloq_usuario FOREIGN KEY (criado_por) REFERENCES USUARIO(id) ON DELETE SET NULL ON UPDATE CASCADE,
  UNIQUE KEY uk_horariobloq_quadra_horario (quadra_id,horario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;