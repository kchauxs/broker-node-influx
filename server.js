const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const chalk = require('chalk');
require('dotenv').config()
const socket = require('./microservices/socket/socket');
const config = require('./config.js');
//const db = require('./store/setup');
const { influx, mongodb } = require('./store/setup');
const router = require('./network/routes');
const errors = require('./network/errors');
const emit = require('./microservices/socket/emit')
const cookieParser = require('cookie-parser');

const app = express();
const server = require('http').Server(app);

mongodb(config)
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ------- SOCKET LOCAL -------------
socket.connect(server);
emit.count_by_zones(socket)
emit.count_by_devices(socket)
emit.list_zones(socket)
//----------------------------

router(app);
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.use(errors);

influx.getDatabaseNames()
  .then(names => {
    console.log("INFLUX CONNECTED",names)
  })
  .then(() => {
    server.listen(config.api.port, function () {
      console.log(chalk.bold.green('App listening on port ==>(' + chalk.bold.magenta(config.api.port) + ')'));
    });
  })
  .catch(err => {
    console.error(`Error creating Influx database!`);
  })
