module.exports = {
  type: 'mysql',
  port: 3306,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: ['error'],
  entities: [process.env.ENTITY_PATH],
  maxQueryExecutionTime: 1000,
};
