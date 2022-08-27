require("dotenv").config();

const express = require("express");
const cors = require("cors");

const config = require("./config");

// * App initialization
const app = express();
app.use(cors());
app.use(express.json());

// * Healthcheck

app.use(`/health-check`, (req, res) =>
  res.json({
    success: true,
    message: `${process.env.NODE_ENV} server is running healthy`,
  })
);

app.use("/api/v1", require("./routes"));

// * Server
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(
    `🚀 ${process.env.NODE_ENV} server ready at: http://localhost:${port}`
  );
});
