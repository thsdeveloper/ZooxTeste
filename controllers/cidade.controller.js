const db = require("../models");
const Cidade = db.cidades;

// Cria e salva um novo cidade
exports.create = (req, res) => {

    console.log(req.body)

    //Valida o request
    if (!req.body.nome) {
        res.status(400).send({message: "O campo nome não pode estar vazio!"});
        return;
    }
    if (!req.body.estadoId){
        res.status(400).send({message: "O campo estado não pode estar vazio!"});
        return;
    }

    //Cria um novo cidade
    const cidade = new Cidade({
        nome: req.body.nome,
        estadoId: req.body.estadoId,
    });

    // Salva o cidade no banco de dados
    cidade.save(cidade).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao criar o Cidade."
        });
    });
};

// Recupere todos os cidades do banco de dados.
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? {nome: {$regex: new RegExp(nome), $options: "i"}} : {};

    Cidade.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao recuperar os cidades."
        });
    });
};

// Encontre um cidade por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Cidade.findOne({_id: id}).then(data => {
        if (!data)
            res.status(404).send({message: "Nenhum cidade encontrado com o id: " + id});
        else res.send(data);
    }).catch(err => {
        res.status(500).send({message: "Erro ao recuperar o cidade com o id:" + id});
    });
};

// Fazer update no cidade pelo ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados a serem atualizados não podem estar vazios!"
        });
    }

    const id = req.params.id;

    Cidade.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Não foi possível atualizar o cidade com o id: ${id}. Talvez não tenha sido encontrado!`
            });
        } else res.send({message: "Cidade atualizado com sucesso!"});
    }).catch(err => {
        res.status(500).send({
            message: "Erro ao atualizar o cidade com o id: " + id
        });
    });
};

// Deletar um cidade com o id
exports.delete = (req, res) => {
    const id = req.params.id;

    Cidade.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Não foi possível atualizar o cidade com o id: ${id}. Talvez não tenha sido encontrado!`
            });
        } else {
            res.send({
                message: "Cidade deletado com sucesso!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Erro ao deletar o cidade com o id: " + id
        });
    });
};

// Delete todos os cidades do banco de dados
exports.deleteAll = (req, res) => {
    Cidade.deleteMany({}).then(data => {
        res.send({
            message: `${data.deletedCount} Cidades deletados com sucesso!`
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ocorreu algum erro ao deletar todos os cidades."
        });
    });
};