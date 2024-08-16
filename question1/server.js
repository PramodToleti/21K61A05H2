const express = require("express");
const morgan = require("morgan");
const router = require("./routes/routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/health", (_, res) => {
  res.send("200 OK");
});

app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
