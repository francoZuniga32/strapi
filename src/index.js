const express = require('express')
const sequelize = require('./database/index');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session')

/**
 * Configuraciones, y CORS
 */
const app = express();
app.set('PORT', 3000);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('key', process.env.CLAVE);
app.set('public', path.join(__dirname, 'public'));
app.use('/static', express.static(app.get('public')));
console.log(app.get('public'));

app.use(cors());

app.use('/instrumental/create', require('./midelware/authvendedor'));
app.use('/upload', require('./midelware/authvendedor'));
app.use('/instrumental/me', require('./midelware/authvendedor'));
app.use('/instrumental/buy', require('./midelware/auth'));
app.use('/compras', require('./midelware/auth'));

app.use('/usuario', require('./app/Usuarios/ruta'));
app.use('/mercadopago', require('./app/Mercadopago/ruta'));
app.use('/upload/', require('./app/Uploads/ruta'));
app.use('/instrumental', require('./app/Instrumentales/ruta'));
app.use('/albumes', require('./app/Albumes/ruta'));
app.use('/vendedor', require('./app/Vendedor/ruta'));
app.use('/compras', require('./app/Compras/ruta'));

app.listen(app.get('PORT'), () => {
    sequelize.authenticate().then(() => {
        console.log("se conecto con exito!!");
    }).catch((err) => {
        console.log(err);
    })
    console.log("listen to port " + app.get('PORT'));
})