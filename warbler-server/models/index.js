const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/warbler", {
    keepAlive: true,
    useNewUrlParser: true
}). then(() => {
    console.log("Connected to the DB")
}).catch((err) => {
    console.log("Not connected to Mongo", err)
})

module.exports.User = require("./user");
module.exports.Message = require("./message");