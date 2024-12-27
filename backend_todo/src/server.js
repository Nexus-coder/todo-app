/**
 * Starting the app this way helps us to separate our concerns
 */

/**
 * Module dependencies.
 */
const http = require("http");
const https = require('https')
const fs = require('fs')


const app = require("./app");
const { mongoConnect, isProduction } = require("./services/mongo");

const PORT = process.env.PORT || 3000;

const HTTPServer = http.createServer(app);



async function connectToMongoDB() {
  try {
    await mongoConnect();

    // Start the Express server after successful MongoDB connection
    if (isProduction) {
      HTTPServer.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
      })
    } else {

      const HTTPSServer = https.createServer({
        cert: fs.readFileSync('cert.pem'),
        key: fs.readFileSync('key.pem')
      }, app)

      HTTPSServer.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
      });
    }

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectToMongoDB();
