const express = require('express');
const mongoose = require('mongoose');
const CustomerRecords = require("./models/customer_records");
const Customer = require('./models/customer');
const connectDB = require('./connection/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();


// Middleware
app.use(express.json());

// Routes
app.post('/api/Add_customers', async (req, res) => {
  try {
    console.log('hit add customer ')
    const { name } = req.body;
    const customer = new Customer({ name });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// POST API endpoint to create a new customer record
app.post('/api/customer-records', async (req, res) => {
  try {
    console.log('hit record save api' , req.body)
    // Extract data from the request body
    const { customerId, weight, price } = req.body;

    // Check if the customerId is valid
    const existingCustomer = await Customer.findById(customerId);
    if (!existingCustomer) {
      return res.status(400).json({ message: 'Invalid customer ID' });
    }

    // Create a new customer record
    const newRecord = new CustomerRecords({
      Customer: customerId,
      weight,
      price
    });

    // Save the new record to the database
    await newRecord.save();

    // Return a success response
    res.status(201).json(newRecord);
  } catch (error) {
    // Handle any errors
    console.error('Error creating customer record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/get_recordsbyid/:_id', async (req, res) => {
  try {
    const _id = req.params._id;
    console.log("get _id" , _id , "hit get records")
    // Use try-catch block to handle potential errors
    try {
      // Find customer records by _id and populate the 'Customer' field
      const customers = await CustomerRecords.find({ 'Customer': _id }).populate('Customer').lean();
      // Check if any records are found
      if (customers.length === 0) {
        return res.status(404).json({ message: 'No records found for the given customer ID' });
      }
      // If records are found, send them in the response
      res.json(customers);
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  } catch (err) {
    // Handle errors related to parameter parsing
    res.status(400).json({ message: 'Invalid parameter format' });
  }
});




// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
