const express = require('express');
const router = express.Router();
const cancionControllerApi = require('../../controllers/api/cancionControllerApi');
const { body } = require('express-validator');
const db = require('../../database/models');

const validations = [
    body('titulo').notEmpty().withMessage('El título es requerido').bail(),
    body('duracion').notEmpty().withMessage('La duración es requerida').bail()
        .isInt().withMessage('La duración debe ser un número entero').bail(),
    body('genero_id').notEmpty().withMessage('El ID del género es requerido').bail()
        .isInt().withMessage('El ID del género debe ser un número entero').bail()
        .custom (
            async (value) => {
            const genero = await db.Generos.findByPk(value);
            if (!genero) {
                return Promise.reject('El ID del género proporcionado no existe');
            }
        }),
    body('album_id').notEmpty().withMessage('El ID del álbum es requerido').bail()
        .isInt().withMessage('El ID del álbum debe ser un número entero').bail()
        .custom (
            async (value) => {
            const album = await db.Albumes.findByPk(value);
            if (!album) {
                return Promise.reject('El ID del album proporcionado no existe');
            }
        }),
    body('artista_id').notEmpty().withMessage('El ID del artista es requerido').bail()
        .isInt().withMessage('El ID del artista debe ser un número entero').bail()
        .custom (
            async (value) => {
            const artista = await db.Artistas.findByPk(value);
            if (!artista) {
                return Promise.reject('El ID del artista proporcionado no existe');
            }
        }),
]

router.get('/', cancionControllerApi.list);
router.post('/create', validations,cancionControllerApi.create);
router.get('/:id', cancionControllerApi.detail);
router.put('/update/:id', validations,cancionControllerApi.update);
router.delete('/delete/:id', cancionControllerApi.destroy);


module.exports = router;