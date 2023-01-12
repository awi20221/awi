const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
// console.log(process.env.JWT_SECRET);

const express = require("express");
const config = require("../backend/config/config");
const auth = require("./routes/auth");
const users = require("./routes/users");
const currencies = require("./routes/currencies");
const shares = require("./routes/shares");
const mail = require("./routes/mail")
const defaultUser = require("./config/defaultUser");
const passport = require("./config/passport");
const { notFound, catchErrors } = require("./middlewares/errors");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");


//Configuration of server instance
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../frontend/public'));

//konfiguracja dostepu do plikow statyczny, umozliwia ich importowanie
app.use(express.static(path.join(__dirname,'../frontend/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //umożliwia odczyt danych z ciała żądania w aplikajach express

//Configure passport which has two strategies 'local' to login, and 'jwt' after login to authorize
passport.configJWT();

// Connect to database
const dbConfig = require("./config/database");
const mongoose = require("mongoose");
// const User = require("./models/user").userModel;
// const currenciesController = require('./controllers/currenciesController')

mongoose
  .connect(dbConfig.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log("Error: Could not connect to MongoDB", err));
mongoose.Promise = global.Promise;

mongoose.connection.on("error", (err) => {
  console.log("Could not connect to MongoDB ", err);
  process.exit();
});

//initialize admin account if there is none user in the database
defaultUser.initializeData().catch(err => console.log('Error: Cannot initialize admin account', err));

//configure CORS (cross-origin resource sharing) which enables fetching data from other domeins like NBP, (need to be enabled before routes)
app.use(cors());


// routes config
app.use("/api/auth", auth.apiAuth());
app.use("/api/users", users.apiUsers());
app.use("/api/currencies", currencies.apiCurrencies());
app.use("/api/shares", shares.apiShares());
app.use("/api/mail", mail.apiMailSender());



// errors handling, czyli wywołania funckcji next z kontrolerów
app.use(notFound);
app.use(catchErrors);

// start listening
async function listen() {
  await app.listen(config.configValues.server.port, () => {
    console.log(`Listen port: ` + config.configValues.server.port);
  });
}
listen()
  .then(() => {})
  .catch((err) => {
    console.log("Server error: ", err);
  });
