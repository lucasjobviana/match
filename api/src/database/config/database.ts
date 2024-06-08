import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'senha_mysql',
  database: 'match_database',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

export = config;// // import { Options } from 'sequelize';

// const config = {
//   username: process.env.DB_USER || 'root',
//   password: process.env.DB_PASS || 'senha_mysql',
//   database: 'match_database',
//   host: process.env.DB_HOST || 'localhost',
//   port: Number(process.env.DB_PORT) || 3306,
//   dialect: 'mysql',
//   dialectOptions: {
//     timezone: 'Z',
//   },
//   logging: false,
// };

// // export = config;
// // module.exports = {
// //   development: config,
// //   test: config,
// //   production: config,
// // };
// // // src/config/config.js

// // const config = {
// //   username: process.env.MYSQL_USER,
// //   password: process.env.MYSQL_PASSWORD,
// //   database: process.env.MYSQL_DATABASE,
// //   host: process.env.MYSQL_HOST,
// //   dialect: 'mysql',
// // };

// module.exports = {
//   development: config,
//   test: config,
//   production: config,
// };