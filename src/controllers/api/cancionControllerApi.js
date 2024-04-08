const db = require('../../database/models')
const { validationResult } = require('express-validator');


const cancionControllerApi = {
    list: async (req, res) => {
        try{
            const cancionesList = await db.Canciones.findAll({
                include: [
                    
                { model: db.Generos, as: 'genero', attributes: ['name'] },
                { model: db.Albumes, as: 'album', attributes: ['nombre'] },
                { model: db.Artistas, as: 'artista', attributes: ['nombre'] }
                ]
            })
            const respuesta = {
                meta: {
                    status: 200,
                    totalCanciones: cancionesList.length,
                    url:'/apicanciones'
                },
                data: cancionesList
            }
            res.json(respuesta)
        }
        catch (err){
            console.log(err)
            res.send(err.message)
        }

    },
    
    detail: async (req, res) => {
        try{
            const cancion = await db.Canciones.findByPk(req.params.id,{
                include: [
                    
                    { model: db.Generos, as: 'genero', attributes: ['name'] },
                    { model: db.Albumes, as: 'album', attributes: ['nombre'] },
                    { model: db.Artistas, as: 'artista', attributes: ['nombre'] }
                    ]
            });
            
            if (!cancion) {
                return res.status(404).json({status: 404, error: 'Canción no encontrada' });
            }
            return res.json({
                meta: {
                    status: 200,
                    url: '/apicanciones/' + req.params.id
                },
                data: cancion
            })
        }catch (err){
            console.log(err);
            res.status(500).json({status: 500, error: 'Error interno del servidor' })
        }

    },

    create: async (req, res) => {
        try {
            const errors = validationResult(req);
            console.log(errors)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const cancionEncontrada = await db.Canciones.findOne({
                where: {
                    titulo: req.body.titulo,
                    genero_id: req.body.genero_id,
                    artista_id: req.body.artista_id
                }
            });

            if (cancionEncontrada) {
                return res.status(400).json({ error: 'La cancion ya se encuentra registrada' });
            }

            const cancion = await db.Canciones.create(
                {
                    id: req.body.id,
                    titulo: req.body.titulo,           
                    duracion: req.body.duracion,
                    genero_id: req.body.genero_id,
                    album_id: req.body.album_id,
                    artista_id: req.body.artista_id
                },

            )           
            res.json({
                meta: {
                    status: 201,
                    url: '/apicanciones/create/',
                    created: 'Ok'
                },
                data: cancion
            })
        } catch (err){
                console.log(err);
                res.status(500).json({status: 500, error: 'Error interno del servidor' });
            
        }

    },

    update: async (req,res) =>{
        const idIngresado = req.params.id

        try{
            const errors = validationResult(req);
            console.log(errors)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const cancionEncontrada = await db.Canciones.findByPk(idIngresado);
        
            if(cancionEncontrada){
                console.log(JSON.parse(JSON.stringify(cancionEncontrada)));
                await db.Canciones.update({
                    titulo: req.body.titulo,
                    duracion: req.body.duracion,
                    genero_id: req.body.genero_id,
                    album_id: req.body.album_id,
                    artista_id: req.body.artista_id
                },
                    {
                    where:{
                    id : idIngresado
                    }
                })
                const cancion = await db.Canciones.findOne({
                where: {
                    id: idIngresado
                    }
                })
                res.json({
                    meta: {
                    status: 200,
                    url: '/apicanciones/udpdate/'+ req.params.id,
                    updated: 'Ok'
                    },
                    data: cancion
                })
            }
            else{
                return res.status(404).json({status: 404, error: 'Canción no encontrada' });
            }
        }
        catch (err){
            console.log(err);
            res.status(500).json({status: 500, error: 'Error interno del servidor' });
        
        }

    },

    destroy: async (req,res) => {
        try {
            const cancion = await db.Canciones.findByPk(req.params.id)
            if (!cancion) {
                return res.status(404).json({status: 404, error: 'Canción no encontrada' });
            }
            await db.Canciones.destroy({
                where:{
                    id: req.params.id
                }
            })

            return res.json({
                meta: {
                    status:204,
                    url: '/apicanciones/delete/' + req.params.id,
                    deleted: 'Ok'
                },
                data: cancion
            })
        } catch(err){
            console.log(err);
            res.status(500).json({ status: 500,error: 'Error interno del servidor' })
        }
    }
    

}

module.exports = cancionControllerApi;