const controlador = {};

const path = require('path');
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Files = require('../../database/models/files');

//mp3

const storageMp3 = multer.diskStorage({
    destination: path.join(__dirname, '../../public/instrumental/mp3'),
    filename: (req, file, cb) => {
        var name = encriptfile(file.originalname);
        cb(null, name);
    }
})

const uploadMp3 = multer({
    storage: storageMp3,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.mp3') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: '15MB'
    }
}).single('mp3');

//wav
const storageWav = multer.diskStorage({
    destination: path.join(__dirname, '../../public/instrumental/wav'),
    filename: (req, file, cb) => {
        var name = encriptfile(file.originalname);
        cb(null, name);
    }
})

const uploadWav = multer({
    storage: storageWav,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.wav') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: '15MB'
    }
}).single('wav');

//samples

const storageSample = multer.diskStorage({
    destination: path.join(__dirname, '../../public/sample'),
    filename: (req, file, cb) => {
        var name = encriptfile(file.originalname);
        cb(null, name);
    }
})

const uploadSample = multer({
    storage: storageSample,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.zip' && ext !== '.rar') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
}).single('sample');

//baner

const storageBaner = multer.diskStorage({
    destination: path.join(__dirname, '../../public/baners'),
    filename: (req, file, cb) => {
        var name = encriptfile(file.originalname);
        cb(null, name);
    }
})

const uploadBaner = multer({
    storage: storageBaner,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.jpeg' && ext !== '.jpg' && ext !== '.png') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024
    }
}).single('baner');

//minuaturas

const storageMinuatura = multer.diskStorage({
    destination: path.join(__dirname, '../../public/minuaturas'),
    filename: (req, file, cb) => {
        var name = encriptfile(file.originalname);
        cb(null, name);
    }
})

const uploadMinuatura = multer({
    storage: storageMinuatura,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.jpeg' && ext !== '.jpg' && ext !== '.png') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024
    }
}).single('minuatura');

function encriptfile(filename) {
    return crypto.createHash('sha1').update(filename).digest('hex') + "." + filename.split('.')[1]
}

controlador.minuatura = async(req, res) => {
    uploadMinuatura(req, res, async(err) => {
        if (err) {
            console.log(err);
        }
        var token = req.headers['access-token'];
        var usuario = jwt.verify(token, process.env.CLAVE);

        if (usuario) {
            var file = await Files.create({
                user: usuario.id,
                tipe: "miniatura",
                url: `http://localhost:3000/static/minuaturas/${req.file.filename}`,
                meta: req.file
            });
            if (file) res.status(200).send(file);
        }
    })
}

controlador.mp3 = async(req, res) => {
    uploadMp3(req, res, async(err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }

        var token = req.headers['access-token'];
        var usuario = jwt.verify(token, process.env.CLAVE);
        console.log(usuario);
        if (usuario) {
            var file = await Files.create({
                user: usuario.usuario.id,
                tipe: "mp3",
                url: `http://localhost:3000/static/instrumental/mp3/${req.file.filename}`,
                meta: req.file
            });
            if (file) res.status(200).send(file);
        } else {
            req.status(203).send();
        }
    });
}

controlador.wav = async(req, res) => {
    uploadWav(req, res, async(err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        var token = req.headers['access-token'];
        var usuario = jwt.verify(token, process.env.CLAVE);
        console.log(usuario);
        if (usuario) {
            var file = await Files.create({
                user: usuario.usuario.id,
                tipe: "wav",
                url: `http://localhost:3000/static/instrumental/wav/${req.file.filename}`,
                meta: req.file
            });
            if (file) res.status(200).send(file);
        } else {
            req.status(203).send();
        }
    });
}

controlador.sample = async(req, res) => {
    uploadSample(req, res, async(err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        var token = req.headers['access-token'];
        var usuario = jwt.verify(token, process.env.CLAVE);
        console.log(usuario);
        if (usuario) {
            var file = await Files.create({
                user: usuario.usuario.id,
                tipe: "sample",
                url: `http://localhost:3000/static/sample/${req.file.filename}`,
                meta: req.file
            });
            if (file) res.status(200).send(file);
        } else {
            req.status(203).send();
        }
    });
}

controlador.baner = async(req, res) => {
    uploadBaner(req, res, async(err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        var token = req.headers['access-token'];
        var usuario = jwt.verify(token, process.env.CLAVE);
        console.log(usuario);
        if (usuario) {
            var file = await Files.create({
                user: usuario.usuario.id,
                tipe: "baner",
                url: `http://localhost:3000/static/baners/${req.file.filename}`,
                meta: req.file
            });
            if (file) res.status(200).send(file);
        } else {
            req.status(203).send();
        }
    });
}

module.exports = controlador;