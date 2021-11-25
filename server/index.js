import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();


const __dirname = path.dirname(fileURLToPath(
    import.meta.url));


//configurar las variables  globales
dotenv.config({ path: 'variables.env' });


//Conectar ala base de datos

db.authenticate()
    .then(() => {
        console.log('Base de datos conectada');
    })



//habilitar Pug
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


//Obtener el año actual 
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    next();
});

//Agregar body-parser para leer los datos del  formulario
app.use(express.urlencoded({ extended: true }));

//definir la carpeta publica

app.use(express.static('public'));


//Agregar router
app.use('/', router);


//Puerto y host 

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, () => {

    console.log(`El servidor esta funcionando en el puerto ${port}`)
})