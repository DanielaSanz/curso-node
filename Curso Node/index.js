/* const http = require('http');

const colors = require('colors');

const handleServer = function(req, res) {
    res.writeHead(200, {'Context-type': 'text/html'});
    res.write('<h1>Hola mundo</h1>');
    res.end();
};   

const server = http.createServer(handleServer);

server.listen(3000, function () {
    console.log('server 3000'.blue);
}); */

const express = require('express');
const colors = require('colors');
const morgan = require('morgan');

const server = express();

//Middlewares son manejadores de peticiones que se pueden ejecutar antes de qwue lleguen a su ruta original. Funciona para 
//cualquier ruta que se cree.
//Procesa datos antes que llegue a la ruta, ej: usuario.
//para usarlo se usa server.use(middleware);
//Descargar npm morgan para manejo de logger para mostrar por consola las peticiones que van llegando
//static files manda archivos al frontend. Una vez creado no cambian

function logger(req, res, next) {
    console.log(`Route received: ${req.protocolo}://${req.get('host')}://${req.originalUrl}`);
    next();
}

//Settings
server.set('appName', 'Curso express');
server.set('port', 3000);
//Motor de plantilla ayudan a extender los html- ejs install ejs no necesario requerirlo otro es pug otro handlebars 
server.set('view engine', 'ejs');
  
//Middleware
server.use(express.json());
server.use(morgan('dev'));


server.get('/', (req, res) => {
    const data = [{name:'nana'}, {name:'julian'}, {name:'polli'}];
    res.render('index.ejs', {people: data})
})

//All no es una petición de Http es una función de Express para anteriores a las rutas
//Funciona para una ruta específica.
/* server.all('/user', (req, res, next) => {
    console.log('Por aqui paso');
    next();
})
 */
server.get('/user', function (req, res) {
    res.json({
        name: 'Reina',
        lastname: 'Marla'
    })
});

server.post('/user/:id', function (req, res) {  
    console.log(req.body);
    console.log(req.params);
    res.send('<h1>post</h1> ')
});

server.put('/user/:id', function (req, res) {
    console.log(req.body);
    res.send(`User ${req.params.id} updated`)
});

server.delete('/delete', function (req, res) {
    res.send('<h1>delete</h1>');
    res.end();
});

server.delete('/user/:id', function (req, res) {
    res.send(`User ${req.params.id} delete`);
    res.end();
});


//Static files 
server.use(express.static('public'));

server.listen(server.get('port'), function() {
    console.log(server.get('appName'));
    console.log('server on port', server.get('port'));
});

//Database, en express encontras como conectar la base que vos prefieras
//ORM Sequelize evita que uses suntaxis de la ddbb sino que usa funciones de js, si cambias la ddbb no hay problema.
//ORM Mongoose para MongoDB. 