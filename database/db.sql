CREATE DATABASE cpuv;
USE DATABASE cpuv;
-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);
ALTER TABLE
  users
ADD
  PRIMARY KEY (id);
ALTER TABLE
  users
MODIFY
  id INT(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;
DESCRIBE users;
INSERT INTO
  users (id, username, password, fullname)
VALUES
  (1, 'Andres', 'Asalazar123++', 'Andres Salazar'),
  (1, 'Arianny', 'Ari123++', 'Arianny Rodriguez'),
  (1, 'Yonaiker', 'Yona123++', 'Yonainer Sosa');
SELECT
  *
FROM
  users;
-- products TABLE
  CREATE TABLE products (
    id_product INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    fecha_caducidad VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
  );
ALTER TABLE
  products
ADD
  PRIMARY KEY (id);
ALTER TABLE
  products
MODIFY
  id INT(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;
DESCRIBE products;


CREATE TABLE tipe_product (
  id_tipe_product INT(11) NOT NULL,
  descripcion VARCHAR(100)
);

ALTER TABLE
  tipe_product
ADD
  PRIMARY KEY(id_tipe_product);

ALTER TABLE 
  tipe_product
MODIFY  
  id_tipe_product INT(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;



CREATE TABLE status(
  id_status INT(11) NOT NULL,
  descripcion VARCHAR(100)
);

ALTER TABLE 
  status
ADD
  PRIMARY KEY(id_status);
ALTER TABLE 
  status
MODIFY
  id_status INT(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;
DESCRIBE status;


CREATE TABLE solicitud_producto(
  id_solicitud_producto INT(11) NOT NULL,
  id_product INT(11),
  id_solicitudes INT(11),
  codigo_caja INT(11) NOT NULL,
  id_tipo_caja INT(11)

);

ALTER TABLE solicitud_producto
  ADD 
PRIMARY KEY(id_solicitud_producto);

ALTER TABLE solicitud_producto
  MODIFY
    id_solicitud_producto INT(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;
DESCRIBE solicitud_producto;

CREATE TABLE tipo_caja(
  id_tipo_caja INT(11) NOT NULL,
  descripcion VARCHAR(100)
);

ALTER TABLE tipo_caja
  ADD
PRIMARY KEY(id_tipo_caja);

ALTER TABLE tipo_caja
  MODIFY
  id_tipo_caja INT(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;

  DESCRIBE tipo_caja;

CREATE TABLE solicitudes(
  id_solicitudes INT(11) NOT NULL,
  id_tipo_usuario INT(11),
  nombre_solicitante VARCHAR(100) NOT NULL,
  ubicacion_solicitante VARCHAR(100),
  contacto VARCHAR(100) NOT NULL,
  telefono INT(11) NOT NULL,
  correo VARCHAR(100),
  id_status INT(11)
);

ALTER TABLE 
  solicitudes
ADD
  PRIMARY KEY(id_solicitudes);

ALTER TABLE 
  solicitudes
MODIFY
  id_solicitudes INT(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;

DESCRIBE solicitudes;

CREATE TABLE usuario_solicitud(
  id_usuario_solicitud int(11) NOT NULL,
  id_usuario INT(11),
  id_solicitudes INT(11)
);

ALTER TABLE 
  usuario_solicitud
ADD 
  PRIMARY KEY(id_usuario_solicitud);

ALTER TABLE usuario_solicitud
  MODIFY
id_usuario_solicitud INT(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;
DESCRIBE usuario_solicitud;


CREATE TABLE tipo_usuario(
  id_tipo_usuario INT(11) NOT NULL,
  descripcion VARCHAR(100)
);

ALTER TABLE 
  tipo_usuario ADD
PRIMARY KEY(id_tipo_usuario);

ALTER TABLE
  tipo_usuario
MODIFY
id_tipo_usuario(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 2;

DESCRIBE tipo_usuario;