const mongoose = require('mongoose');
const Customer = require('./customer'); // Corrected import statement

// Define customer schema with timestamps
const customerRecordSchema = new mongoose.Schema({
  Customer: {
    type: mongoose.Schema.Types.ObjectId, // Corrected field definition
    ref: Customer // Corrected reference to the Customer model
  },
  weight: {
    type: String
  },
  price: {
    type: Number
  }
}, { timestamps: true });

// Define customer record model
const CustomerRecords = mongoose.model('CustomerRecord', customerRecordSchema);

module.exports = CustomerRecords;
