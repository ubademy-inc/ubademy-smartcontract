const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

class TestDBManager {
  constructor() {
    this.server = null;
    this.connection = null;
  }

  async connect() {
    this.server = await MongoMemoryServer.create();
    const url = this.server.getUri();
    const config = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    this.connection = await mongoose.connect(url, config);
  }

  async closeDataBase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.server.stop();
  }

  async clearDataBase() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
}

module.exports = TestDBManager;
