require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
// const cors = require('cors');
connectDB();

const app = express();
app.use(cors(
  {
    origin: ["https://shopping-app-tlst.onrender.com/"],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("https://shopping-app-tlst.onrender.com/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
