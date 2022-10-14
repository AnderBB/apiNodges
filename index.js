const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const router = express.Router();
const UserSchema = require('./models/Users.js')

mongoose.connect("")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

router.get('/user', (req, res) => {
    UserSchema.find(function(err, data){
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    })
});

router.post('/user', (req, res) => {
    let newUser = new UserSchema({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        telefono: req.body.telefono,
        password: req.body.password,
    })
    newUser.save(function(err, data){
        if(err){
            console.log(err)
        }else{
        res.send("saved successfully " + newUser)
        }
    });
})
router.get('/', (req, res) => {
    res.send("Hello World");
});

router.get('/saludar/:nombre', (req, res) => {
    var nombre = req.params.nombre;
    res.send("Hola " + nombre);
});

router.get('/verificar_edad/:nombre/:edad', (req, res) => {
    var edad = req.params.edad;
    var nombre = req.params.nombre;

    var mensaje;
    if(edad >= 18){
        mensaje = "Mayor de edad";
    }else{
        mensaje = "Menor de edad";
    }
    res.send("Hola " + nombre + " Eres: " + mensaje);
});

router.get('/despedir', (req, res) => {
    res.send("Adios");
});

app.use(router)
app.listen(port,() => {
    console.log('Listening on '+port)
})