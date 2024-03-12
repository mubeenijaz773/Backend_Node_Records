const mongoose = require('mongoose');
// Define customer schema with timestamps

const customerSchema = new mongoose.Schema(
    {
      name: String,
    
    },
    { timestamps: true }
  );
  

// Define customer model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;