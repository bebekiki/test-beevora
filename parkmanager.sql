-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 30 Décembre 2020 à 16:09
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `parkmanager`
--

-- --------------------------------------------------------

--
-- Structure de la table `parking`
--

CREATE TABLE IF NOT EXISTS `parking` (
  `numPlace` int(10) unsigned NOT NULL,
  `etage` int(10) unsigned NOT NULL,
  `disponibilite` int(11) NOT NULL,
  `tempsOccupation` time NOT NULL,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`numPlace`),
  KEY `user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `parking`
--

INSERT INTO `parking` (`numPlace`, `etage`, `disponibilite`, `tempsOccupation`, `user`) VALUES
(1, 10, 2, '02:00:00', NULL),
(2, 11, 3, '03:00:00', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) CHARACTER SET latin1 NOT NULL,
  `email` varchar(250) CHARACTER SET latin1 NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 NOT NULL,
  `rôle` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `rôle`) VALUES
(2, 'patriciaa', 'patriciamenekeu4@yahoo.fr', '$2a$10$l9ttVjojYrD2ZC8Dmat/gOTIEHhN4QD2aiN6BNTsr8vvrOro5gO66', 'admin'),
(3, 'pat', 'patriciamenekeu2@yahoo.fr', '$2a$10$Qg41ABCQXVWP7c5AgA7tR.ItdmSLew66ENP5c3aalU1Y9p7oLoF/i', ''),
(5, 'linda', 'linda@gmail.com', '$2a$10$qiDkXqh/GaUFzDRH7JAYoejgTeH/zqARH9ei0zepw/.XqJep6n2jm', 'public');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `parking`
--
ALTER TABLE `parking`
  ADD CONSTRAINT `parking_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
