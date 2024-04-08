const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//APIs
const cancionRoutesApi = require('./routes/api/cancionRoutesApi');
const generoRoutesApi = require('./routes/api/generoRoutesApi');


// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

//Rutas
app.use('/ApiCanciones',cancionRoutesApi);
app.use('/ApiGeneros',generoRoutesApi); 


// Manejar errores 404
app.use((req, res, next) => {
    res.status(404).json({ status: 404, message: 'Recurso no encontrado.' });
  });
  
  // Manejar errores internos del servidor
  app.use((err, req, res, next) => {
    console.error('Error interno del servidor:', err);
    res.status(500).json({ status: 500, message: 'Error interno del servidor.' });
  });
  

const PORT = 3500;
app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });