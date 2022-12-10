-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2021 at 12:02 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finaldatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `absent`
--

CREATE TABLE `absent` (
  `ID` int(20) NOT NULL,
  `UserSSN` int(9) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `ActivityID` int(20) NOT NULL,
  `Name` varchar(20) COLLATE utf8_bin NOT NULL,
  `Description` varchar(1000) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `activityimages`
--

CREATE TABLE `activityimages` (
  `ID` int(20) NOT NULL,
  `ActivityID` int(20) NOT NULL,
  `Image` varchar(200) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `activitymembers`
--

CREATE TABLE `activitymembers` (
  `ActivityID` int(20) NOT NULL,
  `ParticipateName` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `camera`
--

CREATE TABLE `camera` (
  `CameraID` int(20) NOT NULL,
  `UserSSN` int(9) NOT NULL,
  `Location` varchar(20) COLLATE utf8_bin NOT NULL,
  `IP-Adress` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `camera-user`
--

CREATE TABLE `camera-user` (
  `CameraID` int(20) NOT NULL,
  `UserSSN` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `child-info`
--

CREATE TABLE `child-info` (
  `ChildSSN` int(9) NOT NULL,
  `Diseases` varchar(1000) COLLATE utf8_bin NOT NULL,
  `Medication` varchar(1000) COLLATE utf8_bin NOT NULL,
  `Access` varchar(100) COLLATE utf8_bin NOT NULL,
  `SectionID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `CourseID` int(20) NOT NULL,
  `TeacherSSN` int(9) NOT NULL,
  `Name` varchar(20) COLLATE utf8_bin NOT NULL,
  `Description` varchar(10000) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `courseimages`
--

CREATE TABLE `courseimages` (
  `ID` int(20) NOT NULL,
  `CourseID` int(20) NOT NULL,
  `Image` mediumtext COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `coursemember`
--

CREATE TABLE `coursemember` (
  `CourseID` int(20) NOT NULL,
  `UserSSN` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `ItemID` int(20) NOT NULL,
  `UserSSN` int(9) NOT NULL,
  `Name` varchar(20) COLLATE utf8_bin NOT NULL,
  `Description` varchar(1000) COLLATE utf8_bin NOT NULL,
  `Category` varchar(20) COLLATE utf8_bin NOT NULL,
  `Price` int(3) NOT NULL,
  `Quantity` int(3) NOT NULL,
  `ProducerName` varchar(20) COLLATE utf8_bin NOT NULL,
  `ProducerPhone` varchar(15) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `itemimages`
--

CREATE TABLE `itemimages` (
  `ID` int(20) NOT NULL,
  `ItemID` int(20) NOT NULL,
  `Image` varchar(200) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `MessageID` int(20) NOT NULL,
  `SenderSSN` int(9) NOT NULL,
  `ReceiverSSN` int(9) NOT NULL,
  `Content` longtext COLLATE utf8_bin NOT NULL,
  `Date` date NOT NULL,
  `Time` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `parent-child`
--

CREATE TABLE `parent-child` (
  `ParentSSN` int(9) NOT NULL,
  `ChildSSN` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `SectionID` int(20) NOT NULL,
  `Name` varchar(10) COLLATE utf8_bin NOT NULL,
  `Type` varchar(3) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `Type-ID` int(3) NOT NULL,
  `Description` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `SSN` int(9) NOT NULL,
  `UserName` varchar(20) COLLATE utf8_bin NOT NULL,
  `FullName` varchar(20) COLLATE utf8_bin NOT NULL,
  `Password` varchar(20) COLLATE utf8_bin NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `Email` varchar(20) COLLATE utf8_bin NOT NULL,
  `Phone` varchar(20) COLLATE utf8_bin NOT NULL,
  `Address` varchar(50) COLLATE utf8_bin NOT NULL,
  `DateOfBirdth` date NOT NULL,
  `PlaceBirdth` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `user-type`
--

CREATE TABLE `user-type` (
  `SSN` int(9) NOT NULL,
  `Type-ID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absent`
--
ALTER TABLE `absent`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserSSN` (`UserSSN`);

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`ActivityID`);

--
-- Indexes for table `activityimages`
--
ALTER TABLE `activityimages`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ActivityID` (`ActivityID`);

--
-- Indexes for table `activitymembers`
--
ALTER TABLE `activitymembers`
  ADD PRIMARY KEY (`ActivityID`);

--
-- Indexes for table `camera`
--
ALTER TABLE `camera`
  ADD PRIMARY KEY (`CameraID`),
  ADD KEY `UserSSN` (`UserSSN`);

--
-- Indexes for table `camera-user`
--
ALTER TABLE `camera-user`
  ADD PRIMARY KEY (`CameraID`,`UserSSN`),
  ADD KEY `UserSSN` (`UserSSN`);

--
-- Indexes for table `child-info`
--
ALTER TABLE `child-info`
  ADD PRIMARY KEY (`ChildSSN`),
  ADD KEY `SectionID` (`SectionID`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`CourseID`),
  ADD KEY `TeacherSSN` (`TeacherSSN`);

--
-- Indexes for table `courseimages`
--
ALTER TABLE `courseimages`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CourseID` (`CourseID`);

--
-- Indexes for table `coursemember`
--
ALTER TABLE `coursemember`
  ADD PRIMARY KEY (`CourseID`,`UserSSN`),
  ADD KEY `UserSSN` (`UserSSN`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`ItemID`),
  ADD KEY `UserSSN` (`UserSSN`);

--
-- Indexes for table `itemimages`
--
ALTER TABLE `itemimages`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ItemID` (`ItemID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`MessageID`),
  ADD KEY `SenderSSN` (`SenderSSN`),
  ADD KEY `ReceiverSSN` (`ReceiverSSN`);

--
-- Indexes for table `parent-child`
--
ALTER TABLE `parent-child`
  ADD PRIMARY KEY (`ParentSSN`,`ChildSSN`),
  ADD KEY `ChildSSN` (`ChildSSN`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`SectionID`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`Type-ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`SSN`);

--
-- Indexes for table `user-type`
--
ALTER TABLE `user-type`
  ADD PRIMARY KEY (`SSN`,`Type-ID`),
  ADD KEY `Type-ID` (`Type-ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absent`
--
ALTER TABLE `absent`
  ADD CONSTRAINT `absent_ibfk_1` FOREIGN KEY (`UserSSN`) REFERENCES `user` (`SSN`);

--
-- Constraints for table `activityimages`
--
ALTER TABLE `activityimages`
  ADD CONSTRAINT `activityimages_ibfk_1` FOREIGN KEY (`ActivityID`) REFERENCES `activity` (`ActivityID`);

--
-- Constraints for table `activitymembers`
--
ALTER TABLE `activitymembers`
  ADD CONSTRAINT `activitymembers_ibfk_1` FOREIGN KEY (`ActivityID`) REFERENCES `activity` (`ActivityID`);

--
-- Constraints for table `camera`
--
ALTER TABLE `camera`
  ADD CONSTRAINT `camera_ibfk_1` FOREIGN KEY (`UserSSN`) REFERENCES `user` (`SSN`);

--
-- Constraints for table `camera-user`
--
ALTER TABLE `camera-user`
  ADD CONSTRAINT `camera-user_ibfk_1` FOREIGN KEY (`CameraID`) REFERENCES `camera` (`CameraID`),
  ADD CONSTRAINT `camera-user_ibfk_2` FOREIGN KEY (`UserSSN`) REFERENCES `user` (`SSN`);

--
-- Constraints for table `child-info`
--
ALTER TABLE `child-info`
  ADD CONSTRAINT `child-info_ibfk_1` FOREIGN KEY (`SectionID`) REFERENCES `section` (`SectionID`),
  ADD CONSTRAINT `child-info_ibfk_2` FOREIGN KEY (`ChildSSN`) REFERENCES `user` (`SSN`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`TeacherSSN`) REFERENCES `user` (`SSN`);

--
-- Constraints for table `courseimages`
--
ALTER TABLE `courseimages`
  ADD CONSTRAINT `courseimages_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`);

--
-- Constraints for table `coursemember`
--
ALTER TABLE `coursemember`
  ADD CONSTRAINT `coursemember_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  ADD CONSTRAINT `coursemember_ibfk_2` FOREIGN KEY (`UserSSN`) REFERENCES `user` (`SSN`);

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`UserSSN`) REFERENCES `user` (`SSN`);

--
-- Constraints for table `itemimages`
--
ALTER TABLE `itemimages`
  ADD CONSTRAINT `itemimages_ibfk_1` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`SenderSSN`) REFERENCES `user` (`SSN`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`ReceiverSSN`) REFERENCES `user` (`SSN`);

--
-- Constraints for table `parent-child`
--
ALTER TABLE `parent-child`
  ADD CONSTRAINT `parent-child_ibfk_1` FOREIGN KEY (`ChildSSN`) REFERENCES `user` (`SSN`),
  ADD CONSTRAINT `parent-child_ibfk_2` FOREIGN KEY (`ParentSSN`) REFERENCES `user` (`SSN`);

--
-- Constraints for table `user-type`
--
ALTER TABLE `user-type`
  ADD CONSTRAINT `user-type_ibfk_1` FOREIGN KEY (`SSN`) REFERENCES `user` (`SSN`),
  ADD CONSTRAINT `user-type_ibfk_2` FOREIGN KEY (`Type-ID`) REFERENCES `type` (`Type-ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
