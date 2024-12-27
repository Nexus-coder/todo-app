require('dotenv').config()
const mongoose = require("mongoose");

const mongoURI = process.env.NODE_ENV == 'production' ? process.env.MONGO_DB_URL : `mongodb://127.0.0.1:27017/todoApp`;

mongoose.connection.once("on", () => {
  console.log("MongoDB server coonection opened");
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
  mongoDisconnect
};
