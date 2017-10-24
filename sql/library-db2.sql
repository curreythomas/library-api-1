<<<<<<< HEAD
CREATE DATABASE  IF NOT EXISTS `library` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `library`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: 0.0.0.0    Database: library
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `author` (
  `ID` int(10) unsigned NOT NULL,
=======
DROP DATABASE IF EXISTS `library`;

CREATE DATABASE library;

USE `library`;

CREATE TABLE `author` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
>>>>>>> 21140a325eaf0da8b2879599d2f1cf2190fe22a1
  `name` varchar(75) NOT NULL,
  `placeOfBirth` varchar(50) NOT NULL,
  `birthDate` date NOT NULL,
  PRIMARY KEY (`ID`)
<<<<<<< HEAD
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'Dr. Suess','Springfield, MA','1920-01-20'),(2,'Michael Crighton','Boston, MA','1940-12-02'),(3,'Aldous Huxley',' London, UK','1923-03-06');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
  `ID` int(10) unsigned NOT NULL,
=======
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

INSERT INTO `author` VALUES (1,'Dr. Seuss','Springfield, MA','1020-05-02'),
(2,'Michael Crighton','BOSTON, MA','1940-12-02'),
(3,'Aldous Huxley','London, UK','1920-05-23');

CREATE TABLE `book` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
>>>>>>> 21140a325eaf0da8b2879599d2f1cf2190fe22a1
  `title` varchar(100) NOT NULL,
  `publisher` varchar(50) NOT NULL,
  `authorID` int(10) unsigned NOT NULL,
  `ISBN` varchar(20) NOT NULL,
  `pages` int(11) NOT NULL,
  `genre` enum('Fiction','Non-Fiction','Historical Fiction','Science Fiction') NOT NULL,
  `description` varchar(200) NOT NULL,
  `rating` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_book_authorID_idx` (`authorID`),
  CONSTRAINT `FK_book_authorID` FOREIGN KEY (`authorID`) REFERENCES `author` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
<<<<<<< HEAD
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'ONE FISH TWO FISH','FUN',1,'1111',54,'Fiction','A fun book',99),(2,'The Lorax','FUN',1,'2222',60,'Fiction','A fun book about lorax and trees',98),(3,'Green Eggs and Ham','FUN',1,'3333',24,'Fiction','A fun book about Sam I am',97),(4,'A Brave New World','Crazy Publisher',3,'4444',324,'Fiction','A fun book about the future',95);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookPrice`
--

DROP TABLE IF EXISTS `bookPrice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookPrice` (
  `ID` int(10) unsigned NOT NULL,
=======
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

INSERT INTO `book` VALUES (1,'ONE FISH TWO FISH','FUN',1,'1111',54,'Fiction','A fun book',99),
(2,'The Lorax','FUN',1,'2222',60,'Fiction','A fun book about the lorax and trees.',98),
(3,'Green Eggs and Ham','FUN',1,'3333',24,'Fiction','A fun book about Sam I am',97),
(4,'A Brave New World','Crazy Publsiher',3,'4444',324,'Fiction','A fun book about the future',95);

CREATE TABLE `bookPrice` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
>>>>>>> 21140a325eaf0da8b2879599d2f1cf2190fe22a1
  `bookID` int(10) unsigned NOT NULL,
  `type` enum('paperback','hardback','audio','kindle') NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_bookPrice_bookID_idx` (`bookID`),
  CONSTRAINT `FK_bookPrice_bookID` FOREIGN KEY (`bookID`) REFERENCES `book` (`ID`)
<<<<<<< HEAD
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookPrice`
--

LOCK TABLES `bookPrice` WRITE;
/*!40000 ALTER TABLE `bookPrice` DISABLE KEYS */;
INSERT INTO `bookPrice` VALUES (1,1,'paperback',9.99),(2,1,'hardback',19.99),(3,1,'audio',24.99),(4,1,'kindle',2.99),(5,2,'paperback',10.99),(6,2,'hardback',18.99),(7,2,'audio',26.99),(8,2,'kindle',1.99),(9,3,'paperback',8.99),(10,3,'hardback',15.99),(11,3,'audio',19.99),(12,3,'kindle',0.99),(13,4,'paperback',18.99),(14,4,'hardback',36.99),(15,4,'audio',27.99),(16,4,'kindle',3.99);
/*!40000 ALTER TABLE `bookPrice` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-23 15:29:59
=======
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

INSERT INTO `bookPrice` VALUES (1,1,'hardback',9.99),(2,1,'audio',19.99),(3,1,'kindle',19.99),(4,1,'paperback',8.99),(5,4,'paperback',28.99),(6,4,'hardback',8.99),(7,2,'hardback',19.00);

CREATE VIEW vbookPrices AS 
SELECT book.ID as ID
, book.title
, book.publisher
, book.authorID
, book.ISBN
, book.pages
, book.genre
, book.description
, book.rating
, bookPrice.ID as bookPriceID
, bookPrice.bookID as bookPricebookID
, bookPrice.type
, bookPrice.price
FROM book 
INNER JOIN bookPrice ON book.ID = bookPrice.bookID

>>>>>>> 21140a325eaf0da8b2879599d2f1cf2190fe22a1
