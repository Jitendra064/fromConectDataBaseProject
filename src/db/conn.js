const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/shopweb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connect your data base");
  })
  .catch((error) => {
    console.log(error.message);
  });
