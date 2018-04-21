var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var DEVICES_COLLECTION = "devices";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready!");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/* The following lines apply to devices API routes. */

/*  "/api/devices"
 *    GET: finds all devices
 *    POST: creates a new device
 */

app.get("/api/devices", function(req, res) {
  db.collection(DEVICES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/devices", function(req, res) {
  var newDevice = req.body;
  newDevice.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid device name input", "Must provide a device name.", 400);
  }

  db.collection(DEVICES_COLLECTION).insertOne(newDevice, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new device.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/devices/:id"
 *    GET: finds device by id
 *    PUT: updates device by id
 *    DELETE: deletes device by id
 */

app.get("/api/devices/:id", function(req, res) {
});

app.put("/api/devices/:id", function(req, res) {
});

app.delete("/api/contacts/:id", function(req, res) {
});
