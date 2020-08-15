const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Scheme = mongoose.Schema;

let usuarioScheme = new Scheme({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario.']
    },
    password: {
        type: String,
        required: [true, 'La contrasenia es obligatoria.']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: {
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            message: '{VALUE} no es un role valido',
        }
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioScheme.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject
}

usuarioScheme.plugin( uniqueValidator, { message:'{PATH} debe de ser unico'})

module.exports = mongoose.model('Usuario', usuarioScheme);