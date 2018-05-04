import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongodb from 'mongodb';
const ObjectID = mongodb.ObjectID;

const DEVICES_COLLECTION = 'devices';

const app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log('Database connection ready!');

  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log('App now running on port', port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log('ERROR:', reason);
  res.status(code || 500).json({'error': message});
}

/* The following lines apply to devices API routes. */

/*
 * REDIRECT GLOBAL
 */

/*  "/api"
 *    GET: redirects to initial page
 */
app.get('/api', function(req, res) {
  res.redirect('/');
});

/*
 * DEVICES API
 */

/*  "/api/devices"
 *    GET: finds all devices
 *    POST: creates a new device
 */
app.get('/api/devices', function(req, res) {
  db.collection(DEVICES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get devices.', 400);
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post('/api/devices', function(req, res) {
  const newDevice = req.body;
  newDevice.createDate = new Date();

  if (!req.body.name) {
    handleError(res, 'Invalid device name input.', 'You must provide a device name.', 400);
  }

  if (!req.body.codename) {
    handleError(res, 'Invalid device codename input.', 'You must provide a device codename.', 400);
  }

  console.log('Creating new device with codename ' + req.body.codename + '...');
  db.collection(DEVICES_COLLECTION).insertOne(newDevice, function (err, document) {
    if (err) {
      handleError(res, err.message, 'Failed to create new device.', 400);
    } else {
      res.status(201).json(document.ops[0]);
    }
  });
});

/*
 * DEVICE ID API
 */

/*  "/api/devices/:id"
 *    GET: finds device via `id`
 *    POST: updates device db (by adding with $push) via `id`
 *    PUT: updates device db (by replacing with $set) via `id`
 *    DELETE: deletes device by `id`
 */
app.get('/api/devices/:id', function(req, res) {
  db.collection(DEVICES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to get device id.', 400);
    } else {
      res.status(200).json(doc);
    }
  });
});

app.post('/api/devices/:id', function(req, res) {
  const updateDoc = req.body;
  delete updateDoc._id;

  db.collection(DEVICES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, { $push: updateDoc }, function(err) {
    if (err) {
      handleError(res, err.message, 'Failed to update device.', 400);
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.put('/api/devices/:id', function(req, res) {
  const updateDoc = req.body;
  delete updateDoc._id;

  db.collection(DEVICES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, { $set: updateDoc }, function(err) {
    if (err) {
      handleError(res, err.message, 'Failed to update device.', 400);
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/devices/:id', function(req, res) {
  db.collection(DEVICES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err) {
    if (err) {
      handleError(res, err.message, 'Failed to delete device.', 400);
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

/*
 * UPDATES API
 */

/*  "/api/devices/:id/updates"
 *    GET: shows all updates for device `id`
 *    POST: publishes new update for device `id`
 */
app.get('/api/devices/:id/updates', function(req, res) {
  db.collection(DEVICES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, data) {
    if (err) {
      handleError(res, err.message, 'Failed to get device id updates.', 400);
    } else {
      // Getting the `count` from the updates on console:
      const keys = Object.keys(data.updates);
      const length = keys.length;
      console.log('This device ID contains ' + length + ' updates');
      // This can be removed later on, it's just an example code.
      res.status(200).json(data.updates);
    }
  });
});

app.post('/api/devices/:id/updates', function(req, res) {
  /* TODO: Give a unique `id` to updates using mongo's ObjectID. */
  const updateDoc = req.body;
  db.collection(DEVICES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, { $push: {'updates': updateDoc} }, function(err) {
    if (err) {
      handleError(res, err.message, 'Failed to update device.', 400);
    } else {
      res.status(200).json(updateDoc);
    }
  });
});

/*  "/api/devices/:id/updates/:number"
 *    GET: gets update information by `number`
 *    DELETE: deletes update by `number
 *    TODO: PUT: { $set: {['updates.' + number]: {id: 'xxx', deleteDate: date}
 */
app.get('/api/devices/:id/updates/:number', function(req, res) {
  const number = req.params.number;
  db.collection(DEVICES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, data) {
    if (err) {
      handleError(res, err.message, 'Failed to get update number.', 400);
    } else {
      res.status(200).json(data.updates[number]);
    }
  });
});

// Workaround based off: https://stackoverflow.com/questions/4588303
app.delete('/api/devices/:id/updates/:number', function(req, res) {
  const number = req.params.number;
  console.log('Getting rid of update number', number);
  db.collection(DEVICES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)},
    { $unset: {['updates.' + number]: true }}, function(err) {
    if (err) {
      handleError(res, err.message, 'Failed to delete (unset) update.', 400);
    } else {
      db.collection(DEVICES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)},
        { $pull: {['updates']: null }}, function(error) {
        if (error) {
          handleError(res, error.message, 'Failed to delete (pull) update.', 400);
        } else {
          res.status(200).json(req.params.id + '/' + number);
        }
      });
    }
  });
});

/*
 * UPDATER API
 */

/*  "/api/v1"
 *    GET: finds all devices
 */
app.get('/api/v1', function(req, res) {
  db.collection(DEVICES_COLLECTION).find({}).toArray(function(err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to get devices.', 400);
    } else {
      res.status(200).json(doc);
    }
  });
});

/*  "/api/v1/:codename"
 *    GET: finds device via `codename`
 */
app.get('/api/v1/:codename', function(req, res) {
  db.collection(DEVICES_COLLECTION).findOne({ codename: (req.params.codename) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to get device codename.', 400);
    } else {
      res.status(200).json(doc);
    }
  });
});

/* Helper to check if ROM type is in the scope. */
const romtypes = [
  'unofficial',
  'release',
  'nightly',
  'snapshot',
  'experimental'
];

/*  "/api/v1/:codename/:romtype"
 *    GET: finds device via `codename` and parses updater ROM `type` response
 */
app.get('/api/v1/:codename/:romtype', function(req, res) {
  /* ROM type is a ghost property, but we still check if it's in the scope. */
  const romtype = req.params.romtype;
  if (!romtypes.includes(romtype)) {
    handleError(res, 'Wanted ROM type does not exist.', 'You need to pick one of the following: ' + romtypes, 400);
  } else {
    db.collection(DEVICES_COLLECTION).findOne({ codename: (req.params.codename) }, function(err, doc) {
      if (err) {
        handleError(res, err.message, 'Failed to get device codename.', 400);
      } else {
        /* The updater will handle the ROM type, we'll show all types regardless. */
        console.log('Getting updates for ' + romtype + ' ROM type...');
        doc.response = doc.updates;
        delete doc.updates;
        res.status(200).json(doc);
      }
    });
  }
});

export default app;
