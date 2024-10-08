const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

connectDb();
const app = express();

const port = 5000;

app.use(express.json());
app.use("/chat", require("./routes/chipController"));
// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});