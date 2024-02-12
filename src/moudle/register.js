const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Shopschema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Phone_Number: {
    type: Number,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  Confirm_password: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

// generating tokens
Shopschema.methods.generateAuthtoken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      "mynamejitendrasainiandyournamekyahai"
    );
    this.tokens = this.tokens.concat({ token: token });

    await this.tokens;
    return token;
  } catch (err) {
    res.send("this is a error part" + err);
    console.log("the error part" + error);
  }
};

//  generating tokens
Shopschema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bycrypt.hash(this.Password, 10);

    this.Confirm_password = await bycrypt.hash(this.Password, 10);
  }
  next();
});

//  Create a collection in database

const shopuser = new mongoose.model("Shopuser", Shopschema);

module.exports = shopuser;
