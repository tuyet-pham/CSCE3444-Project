create table Admin
(
    idAdmin       int default 0 not null
        primary key,
    privilege_lvl int           not null,
    idaccount     int           null
);

create table Scholarship
(
    idScholarship       int default 5000 not null
        primary key,
    `desc`              varchar(200)     null,
    amount              decimal(19, 4)   null,
    due_date            datetime         null,
    idScholarshipSource int              not null,
    accp_status         int default -1   not null
);

create table Scholarship_source
(
    idScholarship_source int default 300 not null,
    URL                  varchar(200)    null,
    date_last_scanned    varchar(45)     not null,
    idScholarship        int             not null,
    primary key (idScholarship_source, idScholarship)
);

create table account
(
    idaccount int default 0 not null,
    username  varchar(20)   not null,
    hashpass  varchar(100)  not null,
    idAdmin   int           not null,
    primary key (idaccount, idAdmin)
);

create table reqtag
(
    idreqtag      int     default 5000 not null,
    sex           int                  null,
    education_lvl int                  null,
    citizenship   tinyint default 0    not null,
    essay         tinyint              null,
    GPA           varchar(5)           null,
    ethnicity     varchar(20)          null,
    idScholarship int                  not null,
    primary key (idreqtag, idScholarship)
);


