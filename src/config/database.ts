import mongoose from "mongoose";
require('dotenv').config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_DATABASE || 'db_test';
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;

let connectionString: string;
if (cluster) {
  connectionString = `mongodb+srv://${dbUsername}:${dbPassword}@${cluster}/${dbName}`;
} else {
  connectionString =
    dbUsername && dbPassword
      ? `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
      : `mongodb://${dbHost}:${dbPort}/${dbName}`;
}

export default {
  connect: () =>
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
  dbName,
  connectionString,
  connection: () => {
    if (mongoose.connection) {
      return mongoose.connection;
    }
  },
};