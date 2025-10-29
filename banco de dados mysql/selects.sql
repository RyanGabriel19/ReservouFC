-- use dbReservouFC;
SET time_zone = '-03:00'; -- Ajustar horário para o log
select * from USUARIO;
select * from LOG;

update USUARIO set tipo = 'a' where id = 17;