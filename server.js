const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./models");
db.mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Conectado ao banco de dados!");
}).catch(err => {
    console.log("Não é possível conectar ao banco de dados!", err);
    process.exit();
});


//inclui as rotas de estado
require("./routes/estado.routes")(app);


// Rota Simples
app.get("/", (req, res) => {
    res.json({message: "Bem vindo a API ZooxSmartData"});
});


// definir porta para as requisições
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serviço rodando na porta: ${PORT}.`);
});