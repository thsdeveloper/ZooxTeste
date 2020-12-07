module.exports = mongoose => {
    const Cidade = mongoose.model(
        "cidade",
        mongoose.Schema(
            {
                nome: String,
                estadoId: String,
            },
            { timestamps: true }
        )
    );

    return Cidade;
};