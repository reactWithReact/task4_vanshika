const { model } = require("mongoose");
const managerSchema = require("./Schema/managerSchema");

// creating a model on the basis of mangagerSchema for the accounts collection
const Account = model("Manager", managerSchema, "accounts");

module.exports = Account;
