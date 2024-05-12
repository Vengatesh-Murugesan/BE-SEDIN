const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db/connect");
app.use(express.json());
app.use(cors());

// router
const projectRouter = require("./routes/projects");
const taskRouter = require("./routes/task");

// routes
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);

// Middleware for handling route not found (404) errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

const port = 6000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
