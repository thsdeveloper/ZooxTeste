module.exports = mongoose => {
    const Estado = mongoose.model(
        "estado",
        mongoose.Schema(
            {
                nome: String,
                abreviacao: String,
            },
            { timestamps: true }
        )
    );

    return Estado;
};