const mongoose = require("mongoose");

require('dotenv').config()

const isProduction = process.env.NODE_ENV == 'production'

const mongoURI = isProduction ? process.env.MONGO_DB_URL : `mongodb://127.0.0.1:27017/todoApp`;
console.log(mongoURI, isProduction)

mongoose.connection.once("on", () => {
  console.log("MongoDB server connection opened");
});

mongoose.connection.on("close", () => {
  console.log("MongoDb connection closed");
});

async function mongoConnect() {
  await mongoose.connect(mongoURI);
  console.log("MongoDB connected");
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  isProduction,
  mongoDisconnect
};
