-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 21 Cze 2019, 17:21
-- Wersja serwera: 10.1.39-MariaDB
-- Wersja PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `RT_CHAT`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Messages`
--

CREATE TABLE `Messages` (
  `user` int(11) UNSIGNED NOT NULL,
  `room` int(11) UNSIGNED NOT NULL,
  `content` varchar(5000) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Rooms`
--

CREATE TABLE `Rooms` (
  `room_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `salt` varchar(50) DEFAULT NULL,
  `hashed_pass` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `Rooms`
--

INSERT INTO `Rooms` (`room_id`, `name`, `salt`, `hashed_pass`) VALUES
(2, 'dawid', 'sa', 'asd'),
(7, 'bob', 'sa', 'asd'),
(11, 'bobby', 'sa', 'asd');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Room users`
--

CREATE TABLE `Room users` (
  `user` int(10) UNSIGNED NOT NULL,
  `room` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Users`
--

CREATE TABLE `Users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `salt` varchar(50) NOT NULL,
  `hashed_pass` varchar(224) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `Messages`
--
ALTER TABLE `Messages`
  ADD KEY `user` (`user`,`room`),
  ADD KEY `room` (`room`);

--
-- Indeksy dla tabeli `Rooms`
--
ALTER TABLE `Rooms`
  ADD PRIMARY KEY (`room_id`);

--
-- Indeksy dla tabeli `Room users`
--
ALTER TABLE `Room users`
  ADD KEY `user` (`user`,`room`),
  ADD KEY `room` (`room`);

--
-- Indeksy dla tabeli `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `Rooms`
--
ALTER TABLE `Rooms`
  MODIFY `room_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT dla tabeli `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `Messages`
--
ALTER TABLE `Messages`
  ADD CONSTRAINT `Messages_ibfk_1` FOREIGN KEY (`user`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `Messages_ibfk_2` FOREIGN KEY (`room`) REFERENCES `Rooms` (`room_id`);

--
-- Ograniczenia dla tabeli `Room users`
--
ALTER TABLE `Room users`
  ADD CONSTRAINT `Room users_ibfk_1` FOREIGN KEY (`room`) REFERENCES `Rooms` (`room_id`),
  ADD CONSTRAINT `Room users_ibfk_2` FOREIGN KEY (`user`) REFERENCES `Users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
