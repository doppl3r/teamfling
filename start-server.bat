:: change path1 to the MongoDB bin
:: change path2 to the project database folder
:: change path3 to the project directory

set path1="C:\Program Files\MongoDB\Server\3.2\bin"
set path2="%~dp0..\resources\mongo-data\db"
set path3="%~dp0"
start cmd /k "cd %path3% & npm start"
C: & cd %path1% & mongod --dbpath=%path2%