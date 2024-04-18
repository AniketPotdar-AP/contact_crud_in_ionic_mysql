CREATE DATABASE ContactManager;
USE ContactManager;

CREATE TABLE user (
    id VARCHAR(100) NOT NULL,
    firstName VARCHAR(40) NOT NULL,
    lastName VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    phoneNo VARCHAR(20) PRIMARY KEY NOT NULL,
    secretKey VARCHAR(100) NOT NULL
);

CREATE TABLE contacts (
    id VARCHAR(100) NOT NULL,
    firstName VARCHAR(40) NOT NULL,
    lastName VARCHAR(40) NOT NULL,
    phoneNo VARCHAR(20) PRIMARY KEY NOT NULL
);