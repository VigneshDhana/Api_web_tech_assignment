const express = require("express");
const mongoose = require("mongoose");
const product = require("./models/product");
const order = require("./models/order");
const customer = require("./models/customer");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");
const cors = require("cors");

mongoose.connect("mongodb://localhost/api_web_tech_assignment");

const app = express();

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.send("Hello world");
});

app.post("/orders", async (req, res) => {
  try {
    console.log(req.body);
    await order.create(req.body);
    res.send({ message: "Order created" });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.post("/product", async (req, res) => {
  try {
    console.log(req.body);
    await product.create(req.body);
    res.send({ message: "Product created" });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.post("/customer", async (req, res) => {
  try {
    console.log(req.body);
    await customer.create(req.body);
    res.send({ message: "Customer created" });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.get("/orders/:orderID", async (req, res) => {
  try {
    let result = await order.find({ customer_id: req.params.orderID });
    res.send({ ...result });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.get("/product/:productID", async (req, res) => {
  try {
    let result = await product.find({ product_id: req.params.productID });
    console.log(req.params);
    res.send(result[0]);
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.get("/customer/:customerID", async (req, res) => {
  try {
    let result = await customer.find({ customer_id: req.params.customerID });
    res.send(result[0]);
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.get("/product/:productType", async (req, res) => {
  try {
    let result = await product.find({ product_type: req.params.productType });
    res.send({ ...result });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.put("/product/:productName/:availableQuantity", async (req, res) => {
  try {
    let [result] = await product.find({ product_name: req.params.productName });
    if (result["available_quantity"] >= req.params.availableQuantity) {
      result["available_quantity"] =
        result["available_quantity"] - req.params.availableQuantity;
      console.log(result);
      await product.updateOne(
        {
          product_name: req.params.productName,
        },
        result
      );
      res.send({ message: "product updated" });
    } else {
      res.send({ message: "ITEM IS OUT OF STOCK" });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.put("/customer/:email/:costOfAnOrder", async (req, res) => {
  try {
    let [result] = await customer.find({
      email: req.params.email,
    });
    console.log(result);
    if (result["balance"] > req.params.costOfAnOrder) {
      result["balance"] = result["balance"] - req.params.costOfAnOrder;
      console.log(result);
      await customer.updateOne(
        {
          email: req.params.email,
        },
        result
      );
      res.send({ message: "Customer updated" });
    } else {
      res.send({ message: "INSUFFICIENT FUNDS" });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.listen(3000, () => console.log("server is running at port 3000"));
