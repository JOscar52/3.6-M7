-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-11-2020 a las 18:43:01
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `m7-php`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda`
--

CREATE TABLE `agenda` (
  `id` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `start_hour` time NOT NULL,
  `hora_llegada` time NOT NULL,
  `allDay` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `agenda`
--

INSERT INTO `agenda` (`id`, `titulo`, `fk_usuario`, `start_date`, `end_date`, `start_hour`, `hora_llegada`, `allDay`) VALUES
(2, 'Libros', 15, '2016-11-02', '2016-11-05', '10:00:00', '09:00:00', 0),
(3, 'Visita', 15, '2016-11-01', '2016-11-06', '13:00:00', '01:00:00', 0),
(4, 'Ventas', 15, '2016-11-02', '2016-11-04', '09:00:00', '22:00:00', 0),
(6, 'Cerrajería', 15, '2020-10-21', '0000-00-00', '11:00:00', '00:00:00', 0),
(30, 'Paseo', 15, '2020-11-12', '0000-00-00', '00:00:00', '00:00:00', 0),
(31, 'Viaje', 15, '2020-11-14', '0000-00-00', '00:00:00', '00:00:00', 0),
(32, 'viaje 2', 15, '2020-11-15', '0000-00-00', '00:00:00', '00:00:00', 0),
(33, 'viaje 3', 15, '2020-11-16', '0000-00-00', '00:00:00', '00:00:00', 0),
(34, 'viaje 4', 15, '2020-11-16', '0000-00-00', '00:00:00', '00:00:00', 0),
(35, 'viaje 5', 15, '2020-11-17', '0000-00-00', '00:00:00', '00:00:00', 0),
(37, 'Clase', 14, '2020-11-09', '2020-11-09', '18:00:00', '19:30:00', 0),
(38, 'Paseo', 14, '0000-00-00', '0000-00-00', '00:00:00', '00:00:00', 0),
(47, 'viaje 6', 14, '2020-11-14', '2020-11-14', '07:00:00', '18:00:00', 0),
(48, 'viaje 7', 14, '2020-11-15', '2020-11-15', '06:00:00', '22:00:00', 0),
(49, 'Tlaxcala', 16, '2020-11-15', '2020-11-20', '06:00:00', '16:00:00', 0),
(50, 'Puebla', 16, '2020-11-22', '0000-00-00', '00:00:00', '00:00:00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id`, `nombre`) VALUES
(1, 'Los Angeles'),
(2, 'Miami'),
(3, 'Albany'),
(4, 'New York City'),
(5, 'Houston'),
(6, 'Austin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `psw` varchar(255) NOT NULL,
  `email` varchar(30) NOT NULL,
  `fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `psw`, `email`, `fecha_nacimiento`) VALUES
(14, 'Enrique Hoyos ', '$2y$10$hMjkETAhXVYrsUtBr/71aOul/k0m61fqYEn01ad0ru8h.FcahBrn2', 'en1@gmail.com', '2001-11-16'),
(15, 'María Hernández', '$2y$10$qQDvWOLLxNGCsAjh7azNRuhmuRhwP0r5UpDK8XyH3rwRS4EBMMhBC', 'micorreo@gmail.com', '2000-09-12'),
(16, 'Nuevo Almenar', '$2y$10$uaxip3cYB1MNEN54UlR.5uHCk4Vcz.lu4fBf7VDuP5cLMiWsdYxBG', 'nvo@gmail.com', '1995-12-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `placa` varchar(8) NOT NULL,
  `fabricante` varchar(30) NOT NULL,
  `referencia` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`placa`, `fabricante`, `referencia`) VALUES
('KDM-324', 'KIA ', 'KIA G4'),
('QSZ-749', 'KIA ', 'KIA G7'),
('RSL-007', 'RENAULT', 'RENAULT R9');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`placa`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
