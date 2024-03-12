// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://mubeenijaz773:mubeen7879@cluster0.dlofbt5.mongodb.net/Milk_Records', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit the process if unable to connect to MongoDB
//   }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI)
    const mongoURI = process.env.MONGO_URI; // Assuming you set the environment variable MONGODB_URI with your connection string
    if (!mongoURI) {
      throw new Error('MongoDB URI is not provided');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
};

module.exports = connectDB;
