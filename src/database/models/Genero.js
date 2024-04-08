
module.exports = (sequelize, DataTypes) => {
    const alias = 'Generos'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING(45),
            default: null
        }

    }
    const config = {
        tableName: 'generos',
        timestamps: false

    }
    const Genero = sequelize.define(alias, cols, config);

    Genero.associate = function(models) {
        Genero.hasMany(models.Canciones, {
            as: "canciones",
            foreignKey: "genero_id"
        })
    }
    return Genero;
}