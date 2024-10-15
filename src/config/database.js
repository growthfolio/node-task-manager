const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const clientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: { version: '1', strict: true, deprecationErrors: true }
    };

    await mongoose.connect(process.env.MONGO_URI, clientOptions);

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("MongoDB connected");

  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
