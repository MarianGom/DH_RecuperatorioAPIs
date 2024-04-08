
module.exports = (sequelize, DataTypes) => {
    const alias = 'Canciones'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },

        titulo: {
            type: DataTypes.STRING(45),
            default: null
        },
        duracion: {
            type:  DataTypes.INTEGER,
            default: null
        },
        genero_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        album_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        artista_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }
    const config = {
        tableName: 'canciones',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'

    }

    const Cancion = sequelize.define(alias, cols, config);

    Cancion.associate = function(models) {
        Cancion.belongsTo(models.Generos, {
            as: "genero",
            foreignKey: "genero_id"
        })
        
        Cancion.belongsTo(models.Albumes, {
            as: "album",
            foreignKey: "album_id"
        })

		Cancion.belongsTo(models.Artistas, {
            as: "artista",
            foreignKey: "artista_id"
        })
    }
    return Cancion;
}