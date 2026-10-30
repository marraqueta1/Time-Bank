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

// ==========================================
// RUTAS DE AUTENTICACIÓN Y REGISTRO (EP 2.5 y 2.6)
// ==========================================
app.post('/api/usuarios', async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;
        
        // VALIDACIÓN DE INPUTS
        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            return res.status(400).json({ error: 'El formato del correo no es válido.' });
        }

        if (contrasena.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
        }

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
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Este correo ya está registrado.' });
        }
        res.status(500).json({ error: 'Error interno al crear el usuario.' });
    }
});

app.post('/api/usuarios/login', async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({ error: 'Por favor, ingresa correo y contraseña.' });
        }

        const usuario = await prisma.usuario.findUnique({ where: { correo } });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo, rol: usuario.rol }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(200).json({ 
            mensaje: 'Inicio de sesión exitoso', 
            token,
            rol: usuario.rol
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// ==========================================
// MIDDLEWARES DE SEGURIDAD Y ROLES
// ==========================================
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
    }

    try {
        const verificado = jwt.verify(token, JWT_SECRET);
        req.usuario = verificado; 
        next(); 
    } catch (error) {
        res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};

const verificarAdmin = async (req, res, next) => {
    try {
        const usuario = await prisma.usuario.findUnique({ where: { id: req.usuario.id } });
        
        if (!usuario || usuario.rol !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
        }
        
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar los permisos del usuario.' });
    }
};

// ==========================================
// RUTAS PARA PUBLICACIONES (OFERTAS)
// ==========================================
app.post('/api/ofertas', verificarToken, async (req, res) => {
    try {
        const { titulo, descripcion, categoria, puntos, tipo } = req.body;
        
        const nuevaOferta = await prisma.oferta.create({
            data: {
                titulo,
                descripcion,
                categoria,
                puntos: parseInt(puntos),
                tipo,
                creadorId: req.usuario.id 
            }
        });
        
        res.status(201).json({ mensaje: 'Publicación creada con éxito', oferta: nuevaOferta });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la publicación en la base de datos' });
    }
});

app.put('/api/ofertas/:id', verificarToken, async (req, res) => {
    try {
        const ofertaId = parseInt(req.params.id);
        const { titulo, descripcion, categoria, puntos, tipo } = req.body;

        const oferta = await prisma.oferta.findUnique({ where: { id: ofertaId } });
        
        if (!oferta) return res.status(404).json({ error: 'Publicación no encontrada' });
        if (oferta.creadorId !== req.usuario.id) {
            return res.status(403).json({ error: 'No tienes permiso para editar esta publicación' });
        }

        const ofertaActualizada = await prisma.oferta.update({
            where: { id: ofertaId },
            data: { titulo, descripcion, categoria, puntos: parseInt(puntos), tipo }
        });

        res.json({ mensaje: 'Publicación actualizada', oferta: ofertaActualizada });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
});

app.delete('/api/ofertas/:id', verificarToken, async (req, res) => {
    try {
        const ofertaId = parseInt(req.params.id);

        const oferta = await prisma.oferta.findUnique({ where: { id: ofertaId } });
        const usuarioActual = await prisma.usuario.findUnique({ where: { id: req.usuario.id } });
        
        if (!oferta) return res.status(404).json({ error: 'Publicación no encontrada' });

        if (oferta.creadorId !== req.usuario.id && usuarioActual.rol !== 'admin') {
            return res.status(403).json({ error: 'No tienes permiso de administrador para borrar esto' });
        }

        await prisma.oferta.delete({ where: { id: ofertaId } });
        res.json({ mensaje: 'Publicación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la publicación' });
    }
});

app.get('/api/ofertas', verificarToken, async (req, res) => {
    try {
        const ofertas = await prisma.oferta.findMany({
            orderBy: { fechaCreacion: 'desc' }, 
            include: {
                creador: {
                    select: { nombre: true } 
                }
            }
        });
        res.json(ofertas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
});

// ==========================================
// RUTAS PARA EL PERFIL DE USUARIO
// ==========================================
app.get('/api/usuarios/perfil', verificarToken, async (req, res) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: req.usuario.id },
            select: {
                id: true,
                nombre: true,
                correo: true,
                saldo: true,
                rol: true,
                descripcion: true,
                fotoUrl: true
            }
        });
        
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
});

app.put('/api/usuarios/perfil', verificarToken, async (req, res) => {
    try {
        const { nombre, descripcion, fotoUrl } = req.body;

        const usuarioActualizado = await prisma.usuario.update({
            where: { id: req.usuario.id },
            data: { 
                nombre, 
                descripcion, 
                fotoUrl 
            },
            select: { id: true, nombre: true, descripcion: true, fotoUrl: true } 
        });

        res.json({ mensaje: 'Perfil actualizado con éxito', usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});