-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-08-2019 a las 14:23:55
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
-- Estructura de tabla para la tabla `donaciones_proveedores`
--

CREATE TABLE `donaciones_proveedores` (
  `id_donaciones_proveedores` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_tipo_usuario` int(11) DEFAULT NULL,
  `id_solicitud_proveedor` int(11) DEFAULT NULL,
  `donacion_productios` varchar(200) NOT NULL,
  `tipo_caja` varchar(11) NOT NULL,
  `id_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `fecha_caducidad` date NOT NULL,
  `description` text,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_tipe_product` int(11) DEFAULT NULL,
  `id_status` int(11) DEFAULT NULL,
  `cantidad_producto` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `telefono` varchar(12) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `id_status` int(11) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_tipo_solicitud` int(11) DEFAULT NULL,
  `razon_proveedor` varchar(200) DEFAULT NULL
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
  `descripcion_status` varchar(100) DEFAULT NULL,
  `tabla_padre` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id_status`, `descripcion_status`, `tabla_padre`) VALUES
(1, 'En espera', NULL),
(2, 'En proceso', NULL),
(3, 'Aprobada', NULL),
(4, 'Anulada', NULL),
(5, 'En existencia', 'products'),
(6, 'No hay existencia', 'products');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipe_product`
--

CREATE TABLE `tipe_product` (
  `id_tipe_product` int(11) NOT NULL,
  `titulo_tipo_producto` varchar(100) DEFAULT NULL,
  `descripcion_tipo_producto` varchar(100) DEFAULT NULL
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
-- Estructura de tabla para la tabla `tipo_solicitud`
--

CREATE TABLE `tipo_solicitud` (
  `id_tipo_solicitud` int(11) NOT NULL,
  `descripcion_tipo_solicitud` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_solicitud`
--

INSERT INTO `tipo_solicitud` (`id_tipo_solicitud`, `descripcion_tipo_solicitud`) VALUES
(1, 'Solicitus Proveedor'),
(2, 'Solicitud Solicitante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int(11) NOT NULL,
  `descripcion_tipo_usuario` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id_tipo_usuario`, `descripcion_tipo_usuario`) VALUES
(1, 'administrador'),
(2, 'colaborador'),
(3, 'solicitante'),
(4, 'proveedor');

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
  `telefono` varchar(11) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `avatar_image` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_usuario`, `username`, `password`, `fullname`, `nombre_razon`, `id_tipo_usuario`, `direccion`, `telefono`, `correo`, `avatar_image`) VALUES
(29, 'admin', '$2a$10$PQoMn7E9RvczkXt/Yb2Pm.WR8iFiDktaTgLZoS/5uQ6ZQ7m06/keS', 'admin', 'Fundacion Comparte por una Vida', 1, 'No aplica', '00000000000', 'admin@cpuv.com', 'utnxs.jpg');

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
-- Indices de la tabla `donaciones_proveedores`
--
ALTER TABLE `donaciones_proveedores`
  ADD PRIMARY KEY (`id_donaciones_proveedores`),
  ADD KEY `fk_donaciones_proveedores_id_tipo_usuario` (`id_tipo_usuario`),
  ADD KEY `fk_donaciones_proveedores_id_status` (`id_status`),
  ADD KEY `fk_donaciones_proveedores_id_usuario` (`id_usuario`);

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
  ADD KEY `fk__solicitudes_id_status` (`id_status`),
  ADD KEY `fk_id_tipo_solicitud` (`id_tipo_solicitud`);

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
-- Indices de la tabla `tipo_solicitud`
--
ALTER TABLE `tipo_solicitud`
  ADD PRIMARY KEY (`id_tipo_solicitud`);

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
-- AUTO_INCREMENT de la tabla `donaciones_proveedores`
--
ALTER TABLE `donaciones_proveedores`
  MODIFY `id_donaciones_proveedores` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id_solicitudes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `solicitud_producto`
--
ALTER TABLE `solicitud_producto`
  MODIFY `id_solicitud_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipe_product`
--
ALTER TABLE `tipe_product`
  MODIFY `id_tipe_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `tipo_caja`
--
ALTER TABLE `tipo_caja`
  MODIFY `id_tipo_caja` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_solicitud`
--
ALTER TABLE `tipo_solicitud`
  MODIFY `id_tipo_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `usuario_solicitud`
--
ALTER TABLE `usuario_solicitud`
  MODIFY `id_usuario_solicitud` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `donaciones_proveedores`
--
ALTER TABLE `donaciones_proveedores`
  ADD CONSTRAINT `fk_donaciones_proveedores_id_status` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`),
  ADD CONSTRAINT `fk_donaciones_proveedores_id_tipo_usuario` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`),
  ADD CONSTRAINT `fk_donaciones_proveedores_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id_usuario`);

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
  ADD CONSTRAINT `fk_id_tipo_solicitud` FOREIGN KEY (`id_tipo_solicitud`) REFERENCES `tipo_solicitud` (`id_tipo_solicitud`),
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
