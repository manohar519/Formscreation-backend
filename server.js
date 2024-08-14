const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
// mongodb+srv://root:<password>@cluster0.9tgdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://chimatamanohar519:<password>@cluster0.tokzkx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const url = `mongodb+srv://root:root@cluster0.9tgdk.mongodb.net/FormsCreation?retryWrites=true&w=majority`;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
app.get("/", (req, res) => {
  res.send("hello");
});

// Routes
const formsRoutes = require("./routes/formRoutes");
app.use("/api/forms", formsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
