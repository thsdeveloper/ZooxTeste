module.exports = app => {
    const estados = require("../controllers/estado.controller.js");

    var router = require("express").Router();

    // Criar novo estado
    router.post("/", estados.create);

    // Listar todos os estados
    router.get("/", estados.findAll);

    // Buscar um estado por ID
    router.get("/:id", estados.findOne);

    // Atualizar um estado por ID
    router.put("/:id", estados.update);

    // Deletar um estado por ID
    router.delete("/:id", estados.delete);

    // Deletar todos os estados
    router.delete("/", estados.deleteAll);

    app.use('/api/estados', router);
};