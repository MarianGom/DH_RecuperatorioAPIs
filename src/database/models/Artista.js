
module.exports = (sequelize, DataTypes) => {
    const alias = 'Artistas'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },

        nombre: {
            type: DataTypes.STRING(45),
            default: null
        }, 
        apellido: {
            type: DataTypes.STRING(45),
            default: null
        }

    }
    const config = {
        tableName: 'artistas',
        timestamps: false

    }
    const Artista = sequelize.define(alias, cols, config);

    Artista.associate = function(models) {
        Artista.hasMany(models.Canciones, {
            as: "canciones",
            foreignKey: "artista_id"
        })
    }
    return Artista;
}