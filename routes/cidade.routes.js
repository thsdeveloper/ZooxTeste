module.exports = app => {
    const cidades = require("../controllers/cidade.controller.js");

    var router = require("express").Router();

    // Criar novo estado
    router.post("/", cidades.create);

    // Listar todos os cidades
    router.get("/", cidades.findAll);

    // Buscar um estado por ID
    router.get("/:id", cidades.findOne);

    // Atualizar um estado por ID
    router.put("/:id", cidades.update);

    // Deletar um estado por ID
    router.delete("/:id", cidades.delete);

    // Deletar todos os cidades
    router.delete("/", cidades.deleteAll);

    app.use('/api/cidades', router);
};