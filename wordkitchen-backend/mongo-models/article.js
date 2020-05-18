const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
  title: String,
  body: String
});

module.exports = model("Article", articleSchema);
