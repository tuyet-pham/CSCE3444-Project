
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ScholarScrape
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `scholarscrape` ;

-- -----------------------------------------------------
-- Schema ScholarScrape
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `scholarscrape` ;
USE `scholarscrape` ;

-- -----------------------------------------------------
-- Table `ScholarScrape`.`Admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scholarscrape`.`Admin` (
  `idAdmin` INT NOT NULL DEFAULT 0,
  `privilege_lvl` INT NOT NULL,
  `idaccount` INT NULL REFERENCES account(idaccount),
  PRIMARY KEY (`idAdmin`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ScholarScrape`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scholarscrape`.`account` (
  `idaccount` INT NOT NULL DEFAULT 0,
  `username` VARCHAR(20) NOT NULL,
  `hashpass` VARCHAR(100) NOT NULL,
  `idAdmin` INT NOT NULL REFERENCES Admin(idAdmin),
  PRIMARY KEY (`idaccount`, `idAdmin`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ScholarScrape`.`Scholarship`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scholarscrape`.`Scholarship` (
  `idScholarship` INT NOT NULL DEFAULT 5000,
  `desc` VARCHAR(200) NULL,
  `amount` DECIMAL(19,4) NULL,
  `due_date` DATETIME NULL,
  `idScholarshipSource` INT NOT NULL REFERENCES Scholarship_source(idScholarship_source),
  `accp_status` INT NOT NULL DEFAULT -1,
  PRIMARY KEY (`idScholarship`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ScholarScrape`.`Scholarship_source`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scholarscrape`.`Scholarship_source` (
  `idScholarship_source` INT NOT NULL DEFAULT 300,
  `URL` VARCHAR(200) NULL,
  `date_last_scanned` VARCHAR(45) NOT NULL,
  `idScholarship` INT NOT NULL REFERENCES Scholarship(idScholarship),
  PRIMARY KEY (`idScholarship_source`, `idScholarship`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ScholarScrape`.`reqtag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scholarscrape`.`reqtag` (
  `idreqtag` INT NOT NULL DEFAULT 5000,
  `sex` INT NULL,
  `education_lvl` INT NULL,
  `citizenship` TINYINT NOT NULL DEFAULT 0,
  `essay` TINYINT NULL,
  `GPA` VARCHAR(5) NULL,
  `ethnicity` VARCHAR(20) NULL,
  `idScholarship` INT NOT NULL REFERENCES Scholarship(idScholarship),
  PRIMARY KEY (`idreqtag`, `idScholarship`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


