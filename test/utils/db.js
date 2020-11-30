const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;

const connectToTestDb = async () => {
  mongo = new MongoMemoryServer();
  await mongoose.connect(
    await mongo.getUri(),
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
};

const dropDatabase = (done) => {
  mongoose.connection.db.dropDatabase(() => {
    done();
  });
};

const dropCollection = async (collectionName) => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    for (let collection of collections) {
      if (collection.name === collectionName) {
        await mongoose.connection.db.dropCollection(collectionName);
        break;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const closeConnection = async () => {
  await mongoose.connection.close();
  mongo.stop();
};

module.exports = {
  connectToTestDb,
  dropDatabase,
  dropCollection,
  closeConnection,
};
