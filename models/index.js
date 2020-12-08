const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.estados = require("./estado.model")(mongoose);
db.cidades = require("./cidade.model")(mongoose);

module.exports = db;