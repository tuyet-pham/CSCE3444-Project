
-- -----------------------------------------------------
-- Schema ScholarScrape
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `scholarscrape` ;
USE `scholarscrape` ;

-- -----------------------------------------------------
-- Table `ScholarScrape`.`Admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scholarscrape`.`Admin`
(
    `idAdmin`       INT NOT NULL auto_increment,
    `privilege_lvl` INT NOT NULL DEFAULT 0,
    `idaccount`     INT NULL REFERENCES Account (idaccount),
    PRIMARY KEY (`idAdmin`)
);

-- -----------------------------------------------------
-- Table `ScholarScrape`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scholarscrape`.`Account`
(
    `idaccount` INT          NOT NULL auto_increment,
    `username`  VARCHAR(20)  NOT NULL,
    `hashpass`  VARCHAR(100) NOT NULL,
    `idAdmin`   INT          NOT NULL REFERENCES Admin (idAdmin),
    PRIMARY KEY (`idaccount`, `idAdmin`)
);

-- -----------------------------------------------------
-- Table `ScholarScrape`.`Scholarship`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scholarscrape`.`Scholarship`
(
    `idScholarship` INT          NOT NULL auto_increment,
    `desc`          VARCHAR(500) NULL,      # Do we need a description?
    `name`          VARCHAR(300) NOT NULL,  #
    `amount`        INT,
    `deadline`      DATE,
    `idreqtag`      INT REFERENCES Reqtag(idreqtag), # URL
    `url`           VARCHAR(300) NULL,   #
    `accp_status`   INT DEFAULT 0,
    PRIMARY KEY (`idScholarship`)
);


-- -----------------------------------------------------
-- Table `ScholarScrape`.`reqtag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scholarscrape`.`Reqtag`
(
    `idreqtag`      INT         NOT NULL auto_increment,
    `sex`           INT         NULL,
    `major`         VARCHAR(40) NULL,
    `citizenship`   TINYINT     NOT NULL DEFAULT 0,
    `essay`         TINYINT     NULL,
    `GPA`           VARCHAR(5)  NULL,
    `ethnicity`     VARCHAR(20) NULL,
    `idScholarship` INT         NOT NULL REFERENCES Scholarship (idScholarship),    #from Scholarship table
    PRIMARY KEY (`idreqtag`, `idScholarship`)
);

