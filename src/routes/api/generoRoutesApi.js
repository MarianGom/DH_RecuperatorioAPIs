const express = require('express');
const router = express.Router();
const generoControllerApi = require('../../controllers/api/generoControllerApi');

router.get('/listadoTotal', generoControllerApi.list);

module.exports = router;