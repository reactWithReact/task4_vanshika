const { Schema } = require("mongoose");
const customerSchema = require("./customerSchema");

// Schema for the documents in the accounts collection

const managerSchema = new Schema(
  {
    managerId: Number,
    firstName: String,
    lastName: String,
    customerIds: [Number],
    customerData: {
      type: [customerSchema],
      ref: "Customer",
    },
  },
  { collection: "accounts" }
);

module.exports = managerSchema;