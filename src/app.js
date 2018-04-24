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
      handleError(res, err.message, "Failed to get devices.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/devices", function(req, res) {
  var newDevice = req.body;
  newDevice.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid device name input.", "You must provide a device name.", 400);
  }

  if (!req.body.codename) {
    handleError(res, "Invalid device codename input.", "You must provide a device codename.", 400);
  }

  db.collection(DEVICES_COLLECTION).count(function (err, count) {
    if (err) {
      handleError(res, err.message, "Something went wrong...", 400);
    }
    if (count === 0) {
      console.log("Creating initial device with codename " + req.body.codename + "...");
      db.collection(DEVICES_COLLECTION).insertOne(newDevice, function (err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create initial device.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    } else {
      db.collection(DEVICES_COLLECTION).findOne({ codename: {$ne:null} }, function(err, doc) {
        // Any new codename must be unique to feed the `v1` API only once.
        if (doc.codename === req.body.codename) {
          console.log("This device codename is already set here:");
          console.log(doc);
          // This won't be an error, the user can modify the codename to a valid one.
          // TODO: Add UI callback to show the codename is already in db.
        } else {
          console.log("Creating new device with codename " + req.body.codename + "...");
          db.collection(DEVICES_COLLECTION).insertOne(newDevice, function (err, doc) {
            if (err) {
              handleError(res, err.message, "Failed to create new device.");
            } else {
              res.status(201).json(doc.ops[0]);
            }
          });
        }
      });
    }
  });
});

/*  "/api/devices/:id"
 *    GET: finds device via `id`
 *    POST: updates device db (by adding with $push) via `id`
 *    PUT: updates device db (by replacing with $set) via `id`
 *    DELETE: deletes device by `id`
 */
app.get("/api/devices/:id", function(req, res) {
  db.collection(DEVICES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get device id.");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.post("/api/devices/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(DEVICES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, { $push: updateDoc }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update device.");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.put("/api/devices/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(DEVICES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, { $set: updateDoc }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update device.");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/devices/:id", function(req, res) {
  db.collection(DEVICES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete device.");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

/*  "/api/v1"
 *    GET: finds all devices
 */
app.get("/api/v1", function(req, res) {
  db.collection(DEVICES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get devices.");
    } else {
      res.status(200).json(docs);
    }
  });
});

/*  "/api/v1/:codename"
 *    GET: finds device via `codename`
 */
app.get("/api/v1/:codename", function(req, res) {
  db.collection(DEVICES_COLLECTION).findOne({ codename: (req.params.codename) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get device codename.");
    } else {
      res.status(200).json(doc);
    }
  });
});

module.exports = app;
