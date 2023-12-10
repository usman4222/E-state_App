const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRouter = require("./Routes/UserRoute")
const authRouter = require("./Routes/AuthRoute")

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected...");
  })
  .catch((error) => {
    console.error("Error in connecting to MongoDB:", error);
  });

const app = express();
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
