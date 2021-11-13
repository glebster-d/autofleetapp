const express = require("express");

//const config = require("config");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api", require("./routes/vehicles.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//const PORT = config.get("port") || 5000;

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}...`);
});
