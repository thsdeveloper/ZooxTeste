const db = require("../models");
const Estado = db.estados;

// Cria e salva um novo estado
exports.create = (req, res) => {

    //Valida o request
    if (!req.body.nome) {
        res.status(400).send({message: "O campo nome não pode estar vazio!"});
        return;
    }
    if (!req.body.abreviacao){
        res.status(400).send({message: "O campo abreviação não pode estar vazio!"});
        return;
    }

    //Cria um novo estado
    const estado = new Estado({
        nome: req.body.nome,
        abreviacao: req.body.abreviacao,
    });

    // Salva o estado no banco de dados
    estado.save(estado).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao criar o Estado."
        });
    });
};

// Recupere todos os estados do banco de dados.
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? {nome: {$regex: new RegExp(nome), $options: "i"}} : {};

    Estado.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao recuperar os estados."
        });
    });
};

// Encontre um estado por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Estado.findOne({_id: id}).then(data => {
        if (!data)
            res.status(404).send({message: "Nenhum estado encontrado com o id: " + id});
        else res.send(data);
    }).catch(err => {
        res.status(500).send({message: "Erro ao recuperar o estado com o id:" + id});
    });
};

// Fazer update no estado pelo ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados a serem atualizados não podem estar vazios!"
        });
    }

    const id = req.params.id;

    Estado.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Não foi possível atualizar o estado com o id: ${id}. Talvez não tenha sido encontrado!`
            });
        } else res.send({message: "Estado atualizado com sucesso!"});
    }).catch(err => {
        res.status(500).send({
            message: "Erro ao atualizar o estado com o id: " + id
        });
    });
};

// Deletar um estado com o id
exports.delete = (req, res) => {
    const id = req.params.id;

    Estado.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Não foi possível atualizar o estado com o id: ${id}. Talvez não tenha sido encontrado!`
            });
        } else {
            res.send({
                message: "Estado deletado com sucesso!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Erro ao deletar o estado com o id: " + id
        });
    });
};

// Delete todos os estados do banco de dados
exports.deleteAll = (req, res) => {
    Estado.deleteMany({}).then(data => {
        res.send({
            message: `${data.deletedCount} Estados deletados com sucesso!`
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ocorreu algum erro ao deletar todos os estados."
        });
    });
};