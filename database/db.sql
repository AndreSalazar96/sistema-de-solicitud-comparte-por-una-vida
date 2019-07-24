-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-07-2019 a las 01:37:15
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cpuv`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `fecha_caducidad` varchar(255) NOT NULL,
  `description` text,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_tipe_product` int(11) DEFAULT NULL,
  `id_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_product`, `title`, `fecha_caducidad`, `description`, `user_id`, `created_at`, `id_tipe_product`, `id_status`) VALUES
(17, 'Camprolac', '11/12/20', 'Camprolac es sabroso', 8, '2019-07-20 15:24:16', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('X7HiSsOeJFQ39YNURUsWpcIAsnSNm9D6', 1563751641, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `id_solicitudes` int(11) NOT NULL,
  `id_tipo_usuario` int(11) DEFAULT NULL,
  `nombre_solicitante` varchar(100) NOT NULL,
  `ubicacion_solicitante` varchar(100) DEFAULT NULL,
  `contacto` varchar(100) NOT NULL,
  `telefono` int(11) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `id_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud_producto`
--

CREATE TABLE `solicitud_producto` (
  `id_solicitud_producto` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_solicitudes` int(11) DEFAULT NULL,
  `codigo_caja` int(11) NOT NULL,
  `id_tipo_caja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `id_status` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipe_product`
--

CREATE TABLE `tipe_product` (
  `id_tipe_product` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_caja`
--

CREATE TABLE `tipo_caja` (
  `id_tipo_caja` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_usuario` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(60) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `nombre_razon` varchar(100) NOT NULL,
  `id_tipo_usuario` int(11) DEFAULT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `avatar_image` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_usuario`, `username`, `password`, `fullname`, `nombre_razon`, `id_tipo_usuario`, `direccion`, `telefono`, `correo`, `avatar_image`) VALUES
(8, 'Andres', '$2a$10$lkXIpo10ikL3HZx58PzOKeI5fQf5RSkXptinnQxSNW.7BKQuHaBom', 'Andres Salazar', '', NULL, '', NULL, NULL, NULL),
(10, 'Arianny', '$2a$10$FdfYDWGO90bUHjTCyvfemulO7dVNzQkqRVSHfK1bulEsu3xyYbCuW', 'Arianny Rodriguez', '', NULL, '', NULL, NULL, NULL),
(11, 'Yonaiker', '$2a$10$Ml2nIRqwPQiWu2doj9MyYuvmLjLcjlnIpFTHgDHc6BGCqH4g16OKa', 'Yonainer Sosa', '', NULL, '', NULL, NULL, NULL),
(12, 'Admin', '$2a$10$12E83w2lBdVVb6qcPn8wdOdZcKD/KDNexKf8CEggiFc0oleru6d36', 'Admin', '', NULL, '', NULL, NULL, NULL),
(13, 'd_guerra', '$2a$10$4i0f.hBlju7tCq4QuSFgQ.rtLj5X4mEcOycIpV6pUVn6tNV06d9tG', 'David Vasquez', '', NULL, '', NULL, NULL, NULL),
(14, 'ahs', '$2a$10$sfbTGfQS8VSUGgY.PMnjienVbImM.MyMoG.gkmmsCpp9mZljbnCSq', 'Abraham Salazar', '', NULL, '', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_solicitud`
--

CREATE TABLE `usuario_solicitud` (
  `id_usuario_solicitud` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_solicitudes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `fk_user` (`user_id`),
  ADD KEY `fk_is_tipe_product` (`id_tipe_product`),
  ADD KEY `fk_id_status` (`id_status`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id_solicitudes`),
  ADD KEY `fk_id_tipo_usuario` (`id_tipo_usuario`),
  ADD KEY `fk__solicitudes_id_status` (`id_status`);

--
-- Indices de la tabla `solicitud_producto`
--
ALTER TABLE `solicitud_producto`
  ADD PRIMARY KEY (`id_solicitud_producto`),
  ADD KEY `fk_id_product` (`id_product`),
  ADD KEY `fk_id_solicitud` (`id_solicitudes`),
  ADD KEY `fk_id_tipo_caja` (`id_tipo_caja`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id_status`);

--
-- Indices de la tabla `tipe_product`
--
ALTER TABLE `tipe_product`
  ADD PRIMARY KEY (`id_tipe_product`);

--
-- Indices de la tabla `tipo_caja`
--
ALTER TABLE `tipo_caja`
  ADD PRIMARY KEY (`id_tipo_caja`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id_tipo_usuario`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_usurs_id_tipo_usuario` (`id_tipo_usuario`);

--
-- Indices de la tabla `usuario_solicitud`
--
ALTER TABLE `usuario_solicitud`
  ADD PRIMARY KEY (`id_usuario_solicitud`),
  ADD KEY `fk_usuario_solicitud_id_usuario` (`id_usuario`),
  ADD KEY `fk_usuario_solicitud_id_solicitud_usuario` (`id_solicitudes`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id_solicitudes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `solicitud_producto`
--
ALTER TABLE `solicitud_producto`
  MODIFY `id_solicitud_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipe_product`
--
ALTER TABLE `tipe_product`
  MODIFY `id_tipe_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipo_caja`
--
ALTER TABLE `tipo_caja`
  MODIFY `id_tipo_caja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuario_solicitud`
--
ALTER TABLE `usuario_solicitud`
  MODIFY `id_usuario_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_id_status` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`),
  ADD CONSTRAINT `fk_is_tipe_product` FOREIGN KEY (`id_tipe_product`) REFERENCES `tipe_product` (`id_tipe_product`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_usuario`);

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `fk__solicitudes_id_status` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`),
  ADD CONSTRAINT `fk_id_tipo_usuario` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`);

--
-- Filtros para la tabla `solicitud_producto`
--
ALTER TABLE `solicitud_producto`
  ADD CONSTRAINT `fk_id_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  ADD CONSTRAINT `fk_id_solicitud` FOREIGN KEY (`id_solicitudes`) REFERENCES `solicitudes` (`id_solicitudes`),
  ADD CONSTRAINT `fk_id_tipo_caja` FOREIGN KEY (`id_tipo_caja`) REFERENCES `tipo_caja` (`id_tipo_caja`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_usurs_id_tipo_usuario` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`);

--
-- Filtros para la tabla `usuario_solicitud`
--
ALTER TABLE `usuario_solicitud`
  ADD CONSTRAINT `fk_usuario_solicitud_id_solicitud_usuario` FOREIGN KEY (`id_solicitudes`) REFERENCES `solicitudes` (`id_solicitudes`),
  ADD CONSTRAINT `fk_usuario_solicitud_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


CREATE TABLE solicitud_proveedor (
  id_solicitud_proveedor INT(11) NOT NULL,
  nombre_proveedor VARCHAR(100) NOT NULL,
  direccion_proveedor VARCHAR(100) NOT NULL,
  razon_proveesor VARCHAR(500) NOT NULL,
  telefono_proveedor VARCHAR(11) NOT NULL,
  correo_proveedor VARCHAR(100) NOT NULL,
  id_tipo_usuario INT(11),
  id_status INT(11)
);

ALTER TABLE solicitud_proveedor
  ADD 
CONSTRAINT pk_id_solicitud_proveedor
  PRIMARY KEY(id_solicitud_proveedor);


ALTER TABLE solicitud_proveedor
  MODIFY id_solicitud_proveedor int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


DESCRIBE solicitud_proveedor;

ALTER TABLE solicitud_proveedor
  ADD CONSTRAINT
fk_solicitud_proveedor_id_tipo_usuario
FOREIGN KEY(id_tipo_usuario)
REFERENCES tipo_usuario(id_tipo_usuario);

ALTER TABLE solicitud_proveedor
  ADD CONSTRAINT
fk_solicitud_proveedor_id_status
FOREIGN KEY(id_status)
REFERENCES status(id_status);

