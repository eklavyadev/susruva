CREATE TABLE IF NOT EXISTS `users` (
  `userid` int(11) NOT NULL,
  `roleid` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `emailid` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `gender` tinyint(4) NOT NULL,
  `subscriptionenddate` datetime DEFAULT NULL,
  `loginaccess` tinyint(4) NOT NULL,
  `deactivationdate` datetime DEFAULT NULL,
  `deactivationreason` varchar(1000) DEFAULT NULL,
  `registrationstageid` bigint(20) DEFAULT NULL,
  `usertimezone` varchar(200) NOT NULL,
  `usertimezoneoffset` int(11) NOT NULL,
  `blackpoints` int(11) DEFAULT NULL,
  `blackpointreseton` timestamp NULL DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `modifieddate` datetime NOT NULL,
  `createdby` bigint(20) DEFAULT NULL,
  `modifiedby` bigint(20) DEFAULT NULL,
  `dialcode` varchar(10) DEFAULT NULL,
  `phonenumber` varchar(20) DEFAULT NULL
)



CREATE TABLE IF NOT EXISTS `marketing` (
  `regid` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` int(12) NOT NULL,
  `class` int(11) NOT NULL,
  `country` varchar(100) NOT NULL,
  `subjects` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `requirements` varchar(1000) NOT NULL,
  `Callstat` varchar(10) NOT NULL,
  `WAstat` varchar(10) NOT NULL,
  `emailstat` varchar(10) NOT NULL,
  `action` varchar(20) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `username` varchar(100) NOT NULL
)