const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const app = express()



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected...");
  })
  .catch((error) => {
    console.error("Error in connecting to MongoDB:", error);
  });


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
