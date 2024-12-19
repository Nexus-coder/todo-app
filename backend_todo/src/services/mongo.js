const mongoose = require("mongoose");

const mongoURI = `mongodb://127.0.0.1:27017/todoApp`;
// const mongoURI = `mongodb+srv://kimani:Pu3hEMLprgPJjlLj@cluster0.hbs3wtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
