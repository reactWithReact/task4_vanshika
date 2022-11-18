const Manager = require("../model/accountModel");

// function for handling the API logic and querying
// quering might move to another file as they get complex

// sending ONLY the customer data.
const getAccount = async (req, res) => {
  console.log("request for account");
  try {
    const manager = await Manager.findOne(
      { managerId: req.params.managerId },
      { customerData: 1, dashboardData: 1 }
    );
    res.send(manager);
  } catch (error) {
    console.log(`error: ${error.message}`);
    res.send([]);
  }
};
module.exports = { getAccount };
