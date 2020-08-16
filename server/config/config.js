// la variabale PORT esta administrada por HEroku por ej en este caso, por lo tanto si no existe estamos en un entorno de desarrollo
// process es un objeto globan que corre en toda la aplicacion
process.env.PORT = process.env.PORT || 3000

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

let url ;

if (process.env.NODE_ENV === 'dev') {
    url = 'mongodb://localhost:27017/cafe'
} else {
    url = process.env.MONGO_URI;
}

process.env.URL_DB = url

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.SEED = process.env.SEED || 'secret';