import express from "express";
import { connectDB } from "./DB/connection.js";
import { authorRouter, bookRouter, logRouter } from "./modules/index.js";

const app = express();
const port = 3000;
const { log } = console;

connectDB();

app.use(express.json());

app.use("/book", bookRouter);
app.use("/author", authorRouter);
app.use("/log", logRouter);


app.listen(port, () => {
  log(`my app listening on port ${port}!`);
});
