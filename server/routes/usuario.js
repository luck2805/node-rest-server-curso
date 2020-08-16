const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require("underscore");
const app = express();

const {verificaToken, verificaAdmin_Role} = require('../middlewares/autenticacion')

app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)


    Usuario.find({estado: true}, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec( (err, usuariosDB) => {

            if (err) {
                return res.status(400, {
                    ok: false,
                    err
                })
            }

            Usuario.count({estado: true}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuariosDB,
                    conteo
                })
            })


        })

});

app.post('/usuario',[verificaToken, verificaAdmin_Role], (req, res) => {

    const body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } 

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    } )

});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    const id = req.params.id;
    const body = _.pick(req.body, ["nombre", "email","img", "role", "estado"]);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true,} ,(err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } 

        res.json({
            ok: true,
            usuario: usuarioDB
        });     

    })

});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    const id = req.params.id;

    // Borrado logico
    Usuario.findByIdAndUpdate(id, {estado: false}, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    })

    // Esto hace un borrado fisico
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             error: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         })
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     })


    // })


});

module.exports = app