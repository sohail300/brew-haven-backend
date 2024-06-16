import express from "express";
import coffeeRoute from "./route/coffeeRoute";
import { connectDB } from "./model/connection";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Root Page");
});

app.use("/api", coffeeRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
