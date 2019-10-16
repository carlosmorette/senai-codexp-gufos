USE Gufos;

INSERT INTO Tipo_Usuario (Titulo)
VALUES ('Administrador'),('Aluno');

INSERT INTO Usuario (Nome,Email,Senha,Tipo_Usuario_id)
VALUES ('Administrador','adm@gmail.com','123',1),
	   ('Ariel','ariel@gmail.com','123',2);

INSERT INTO Localizacao(CNPJ, Razao_Social,Endereco)
VALUES ('12345678912345','Escola SENAI de Informática','Al. Barão de Limeira, 539');

INSERT INTO Categoria(Titulo)
VALUES ('Desenvolvimento')
	   ('HTML + CSS'),
	   ('Marketing');

INSERT INTO Evento(Titulo, Categoria_id,Acesso_livre,Data_evento,Localizacao_id)
VALUES ('C#',2,0,'2019-08-07T18:00:00',1),
	   ('Estrutua Semântica', 2 , 1 , GETDATE() , 1);

INSERT INTO Presenca (Evento_id, Usuario_id, Presenca_id)
VALUES (1 , 2 , 'AGUARDANDO'),
	   (1 , 1 , 'CONFIRMADO');
