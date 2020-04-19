const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByEmail("amaryassa@yahoo.fr")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);

      next();
    })
    .catch((err) => {
      console.log("err", err);
    });
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  const userTest = new User("Amar", "amaryassa@yahoo.fr", { items: [] });
  User.findByEmail("amaryassa@yahoo.fr")
    .then((user) => {
      if (!user) {
        return userTest.save();
      }
      return user;
    })
    .then(() => {
      app.listen(3000);
    })
    .catch((err) => console.log(err));
});
