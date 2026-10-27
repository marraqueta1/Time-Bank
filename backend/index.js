const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro_timebank_2026';

app.get('/', (req, res) => {
    res.json({ mensaje: '¡API de TimeBank funcionando correctamente!' });
});


app.post('/api/usuarios', async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        const nuevoUsuario = await prisma.usuario.create({
            data: { 
                nombre, 
                correo, 
                contrasena: contrasenaEncriptada 
            }
        });
        
        res.status(201).json({ mensaje: 'Usuario creado con éxito' });
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el usuario. El correo podría ya estar registrado.' });
    }
});

app.post('/api/usuarios/login', async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        const usuario = await prisma.usuario.findUnique({ where: { correo } });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(200).json({ 
            mensaje: 'Inicio de sesión exitoso', 
            token 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// ... (Aquí irían los GET, PUT y DELETE para usuarios, servicios y transacciones, siguiendo la misma estructura de manejo de errores y validación de JWT)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});