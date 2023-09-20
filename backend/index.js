const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/sudoku-db";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define a schema and model for your items
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model("Item", itemSchema);

// Create a new item
app.post("/api/items", (req, res) => {
  const newItem = new Item(req.body);
  newItem.save((err, item) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(item);
    }
  });
});

// Get all items
app.get("/api/items", (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(items);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
