delete from animais;
delete from proprietarios;

DROP TABLE animais;
DROP TABLE proprietarios;


CREATE TABLE proprietarios (
proprietario_id SERIAL PRIMARY KEY,
nome VARCHAR NOT NULL,
telefone VARCHAR NOT NULL
);

CREATE TABLE animais (
animal_id SERIAL PRIMARY KEY,
nome VARCHAR NOT NULL,
tipo VARCHAR NOT NULL,
proprietario_id INT NOT NULL,
CONSTRAINT fk_proprietarios FOREIGN KEY (proprietario_id) REFERENCES proprietarios (proprietario_id)
);

CREATE TABLE servicos (
  servico_id SERIAL PRIMARY KEY,
  descricao VARCHAR NOT NULL,
  valor NUMERIC NOT NULL,
  animal_id INT NOT NULL,
  CONSTRAINT fk_animais FOREIGN KEY (animal_id) REFERENCES animais (animal_id)
);


INSERT INTO proprietarios (nome, telefone) VALUES ('Alda Valentim', '(39) 98566-1222');
INSERT INTO proprietarios (nome, telefone) VALUES ('Nicolas Avelar', '(28) 97432-0379');
INSERT INTO proprietarios (nome, telefone) VALUES ('Emilly Baptista', '(31) 99545-2457');
INSERT INTO proprietarios (nome, telefone) VALUES ('Beatriz Bonilha', '(35) 98054-4724');
INSERT INTO proprietarios (nome, telefone) VALUES ('Nataniel Faleiro', '(33) 99594-3315');
INSERT INTO proprietarios (nome, telefone) VALUES ('Richard Santos', '(27) 99597-9170');

INSERT INTO animais (nome, tipo, proprietario_id) VALUES ('Billy', 'Cachorro', 1);
INSERT INTO animais (nome, tipo, proprietario_id) VALUES ('Nala', 'Cachorro', 2);
INSERT INTO animais (nome, tipo, proprietario_id) VALUES ('Mimi', 'Gato', 2);
INSERT INTO animais (nome, tipo, proprietario_id) VALUES ('Dory', 'Cachorro', 3);
INSERT INTO animais (nome, tipo, proprietario_id) VALUES ('Lulu', 'Cachorro', 4);
INSERT INTO animais (nome, tipo, proprietario_id) VALUES ('Bob', 'Cachorro', 5);
INSERT INTO animais (nome, tipo, proprietario_id) VALUES ('Milu', 'Cachorro', 5);
INSERT INTO animais (nome, tipo, proprietario_id) VALUES ('Emmy', 'Gato', 5);
INSERT INTO animais (nome, tipo, proprietario_id) VALUES ('Amora', 'Cachorro', 6);