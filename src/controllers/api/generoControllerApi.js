const db = require('../../database/models')

const generoControllerApi = {
    list: async (req, res) => {
        try{
            const generosList = await db.Generos.findAll(
                {
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: db.Canciones,
                            as: 'canciones' 
                        }
                ]

                }
            )
            const respuesta = {
                meta: {
                    status: 200,
                    totalGeneros: generosList.length,
                    url:'/apigeneros/listadoTotal'
                },
                data: generosList.map(genero => ({
                    id: genero.id,
                    name: genero.name,
                    totalCanciones: genero.canciones.length,
                    Canciones: genero.canciones 
                }))
            }
            res.json(respuesta)
        }
        catch (error){
            console.log(error)
            res.send(error.message)
        }

    },


}

module.exports = generoControllerApi;