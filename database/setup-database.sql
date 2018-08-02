DROP DATABASE IF EXISTS rockpool;
CREATE DATABASE rockpool;
USE rockpool;

CREATE TABLE survey_results (
  id int AUTO_INCREMENT PRIMARY KEY,
  species varchar (50) NOT NULL
);

