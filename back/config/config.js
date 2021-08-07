require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": procee.env.MYSQL_PASSWORD,
    "database": "real-estate-web",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": procee.env.MYSQL_PASSWORD,
    "database": "real-estate-web",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": procee.env.MYSQL_PASSWORD,
    "database": "real-estate-web",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
