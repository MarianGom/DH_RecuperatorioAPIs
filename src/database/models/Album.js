
module.exports = (sequelize, DataTypes) => {
    const alias = 'Albumes'

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
        duracion: {
            type:  DataTypes.INTEGER,
            default: null
        },

    }
    const config = {
        tableName: 'albumes',
        timestamps: false
    }

    
    const Album = sequelize.define(alias, cols, config);

    Album.associate = function(models) {
        Album.hasMany(models.Canciones, {
            as: "canciones",
            foreignKey: "album_id"
        })
    }
    return Album;
}