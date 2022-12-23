const dotenv = require('dotenv')
dotenv.config({ path: '.env' });
console.log(process.env.JWT_SECRET);


//enable styles in index.html file
// require('./views/css/style.css')
const express = require('express')
const join = require('path')
const config = require('../src/config/config')
const songs = require('./routes/songs');
const auth = require('./routes/auth');
const passport = require('./config/passport')
const { notFound, catchErrors } = require('./middlewares/errors')
const bodyParser = require('body-parser')


// Connect to database
const dbConfig = require('./config/database')
const mongoose = require('mongoose')
const path = require("path");

//Configure passport
passport.configJWT();

mongoose.connect(dbConfig.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//konfiguracja dostepu do plikow statyczny, umozliwia ich importowanie
app.use(express.static(path.join(__dirname,'views')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes config
app.use('/api/songs', songs.apiSongs());
app.use('/api/auth', auth.apiAuth());

// errors handling
app.use(notFound);
app.use(catchErrors);

// start listening
app.listen(config.configValues.server.port, () => {
    console.log(`Server is up!`);
});


