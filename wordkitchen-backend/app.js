const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./schema/schema");
// Create an express app
const app = express();

// Connect to mongoDB
mongoose.connect("mongodb://localhost:27017/WordKitchen", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Display message that the connection was successful
mongoose.connection.once("open", () => {
  console.log("Connected to DB successfully");
});

// Add Cross-Origin Resource Sharing middle-ware
app.use(cors());

// Add graphQl middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// Start the server
app.listen(8080, () => {
  console.log("Server started successfully.");
});
