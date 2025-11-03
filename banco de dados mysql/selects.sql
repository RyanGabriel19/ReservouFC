-- use dbReservouFC;
SET time_zone = '-03:00'; -- Ajustar horário
select * from USUARIO;
select * from LOG;
select * from QUADRA;

ALTER TABLE QUADRA DROP COLUMN TIPO;

ALTER TABLE QUADRA ADD COLUMN tipo VARCHAR(255) NOT NULL;

update USUARIO set tipo = 'a' where id = 17;