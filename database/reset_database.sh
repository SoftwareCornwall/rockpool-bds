#!/bin/bash

mysql -u rockpool -p < setup-database.sql 
node createSpeciesList.js
node createLocationsList.js
