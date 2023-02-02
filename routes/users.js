var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
const { dbUrl, mongodb, MongoClient } = require("../dbConfig");

/* GET users listing. */
router.get("/all", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("mystudents");
    let document = await db.collection("datausers").find().toArray();
    res.json({ message: "Data Fetched Successfully", data: document });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error!!" });
  } finally {
    client.close();
  }
});

router.post("/register", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("mystudents");
    const users = await db
      .collection("datausers")
      .findOne({ email: req.body.email });
    if (users) {
      res.send({ message: "email already exists" });
    } else {
      const document = await db.collection("datausers").insertOne(req.body);
      res.json({ message: "Data Recieved Successfully", data: document });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error!!" });
  } finally {
    client.close();
  }
});

router.put("/edit-user/:id", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  console.log(req.params.id);
  try {
    const db = await client.db("mystudents");
    const document = await db
      .collection("datausers")
      .findOneAndReplace({ _id: mongodb.ObjectId(req.params.id) }, req.body);
    if (document.value) {
      res.json({ message: "Data Edited Successfully", data: document.value });
    } else {
      res
        .status(404)
        .json({ message: "Invalid ID. Try with correct id at endpoint" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  } finally {
    client.close();
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  console.log(req.params.id);
  try {
    const db = await client.db("mystudents");
    const document = await db
      .collection("datausers")
      .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });
    if (document.value) {
      res.json({ message: "Data Deleted Successfully", data: document.value });
    } else {
      res
        .status(404)
        .json({ message: "Invalid ID. Try with correct id at endpoint" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  } finally {
    client.close();
  }
});

module.exports = router;
