-- MySQL dump 10.13  Distrib 5.7.21, for Win64 (x86_64)
--
-- Host: localhost    Database: demo
-- ------------------------------------------------------
-- Server version	5.7.21-log

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
-- Table structure for table `panda`
--

DROP TABLE IF EXISTS `panda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `panda` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `detail` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panda`
--

LOCK TABLES `panda` WRITE;
/*!40000 ALTER TABLE `panda` DISABLE KEYS */;
INSERT INTO `panda` VALUES (1,'2018-11-25 20:30:53','panda1','/static/image/index/panda1.JPG','大熊猫每天除去一半进食的时间，剩下的一半时间多数便是在睡梦中度过。在野外，大熊猫在每两次进食的中间睡2-4个小时，平躺、侧躺、俯卧，伸展或蜷成一团都是它们喜好的睡觉方式。在动物园里面，饲养员每天两次定时给它们喂食，所以大熊猫其他的时间都用来休息。即使在睡觉的时候大熊猫看起来也很可爱。它们非常的灵活，能够把它们笨重的身体摆成各种各样的姿势。最喜欢的姿势便是腿撑在树上，并用手遮住眼睛。'),(2,'2018-11-25 20:32:42','panda2','/static/image/index/panda2.jpeg','大熊猫最可爱的特点是它那胖嘟嘟的身体和他那内八字慢吞吞的行走方式。这是因为它们生活的环境里面，有充足的食物，没有天敌，没必要行动很快。但是，正是它这种慢吞吞的动作使它能够保存能量，以适应低能量的食物。它们有时候也会爬树侦察情况，逃避入侵者，或是打盹。'),(3,'2018-11-25 20:32:56','panda3','/static/image/index/panda3.jpeg','大熊猫善于爬树，也爱嬉戏。爬树的行为一般是临近求婚期，或逃避危险，或彼此相遇时弱者借以回避强者的一种方式。熊猫有时还下到山谷，串入到山村小寨或住宅，把锅盆桶具，尤其是圆形的器皿当成玩具，玩耍后弃置山野。有时它们还和羊、猪等家养的牲畜亲善，随着同吃同住'),(4,'2018-11-25 20:33:07','panda4','/static/image/index/panda4.jpeg','通常情况下，大熊猫性情总是十分温顺，初次见人，常用前掌蒙面，或把头低下，不露真容。它们很少主动地攻击其他动物或人，在野外偶然相遇时，总是采用回避的方式。但一但当上了妈妈，其小宝贝就是神圣不可侵犯的，即便是关怀看望，也会惹怒母亲大动肝火，张牙舞爪，动手动脚。有时它们还爱作一些修饰及其他一些求适活动。可以象猫一样把身体伸直，前是伸开，后半身抬起，让身躯灵活舒展，或睡醒以后，前肢直伸打哈欠。如果被水沾湿或过河涉水后，也可以象狗一样把身上的水抖掉。'),(11,'2018-12-10 14:42:32','panda11','/static/image/index/panda5.JPG','你好,胖达酱!'),(12,'2018-12-11 00:14:17','panda12','/static/image/index/panda5.JPG','你好'),(13,'2018-12-19 03:01:35','panda13','/static/image/index/panda5.JPG','你好');
/*!40000 ALTER TABLE `panda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'o_m850nEAP373WGvhZoLTYsqfZd8');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-24 16:30:37
